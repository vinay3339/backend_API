"""
Denormalized Transport Router with Advanced Filtering
All data in single table - use filters instead of JOINs
"""
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from sqlalchemy import or_
from typing import Optional
from datetime import datetime
from database import get_db
from models_denormalized import TransportRoute, School, Student
from auth import get_current_active_user

router = APIRouter(prefix="/data/transport/routes", tags=["Transport (Denormalized)"])


@router.get("/")
@router.get("")
async def get_transport_routes(
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=1000),
    
    # Basic Filters
    school_id: Optional[int] = None,
    school_name: Optional[str] = None,
    route_number: Optional[str] = None,
    status: Optional[str] = None,
    
    # Search
    search: Optional[str] = None,
    route_name: Optional[str] = None,
    
    # Vehicle Filters
    vehicle_number: Optional[str] = None,
    vehicle_type: Optional[str] = None,
    capacity_min: Optional[int] = None,
    capacity_max: Optional[int] = None,
    
    # Driver Filters
    driver_name: Optional[str] = None,
    conductor_name: Optional[str] = None,
    
    # Fee Filters
    fee_min: Optional[float] = None,
    fee_max: Optional[float] = None,
    
    # Student Filters
    total_students_min: Optional[int] = None,
    total_students_max: Optional[int] = None,
    
    # Sorting
    sort_by: Optional[str] = Query("id"),
    sort_order: Optional[str] = Query("asc", regex="^(asc|desc)$"),
    
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_active_user)
):
    """
    Get transport routes with advanced filtering
    
    Examples:
    - All routes in school: ?school_id=1
    - Routes by vehicle type: ?vehicle_type=Bus
    - Routes with capacity: ?capacity_min=40&capacity_max=60
    - Search: ?search=Route A
    """
    query = db.query(TransportRoute)
    
    if school_id:
        query = query.filter(TransportRoute.school_id == school_id)
    if school_name:
        query = query.filter(TransportRoute.school_name.contains(school_name))
    if route_number:
        query = query.filter(TransportRoute.route_number == route_number)
    if status:
        query = query.filter(TransportRoute.status == status)
    
    if search:
        search_filter = or_(
            TransportRoute.route_name.contains(search),
            TransportRoute.route_number.contains(search),
            TransportRoute.vehicle_number.contains(search),
            TransportRoute.driver_name.contains(search)
        )
        query = query.filter(search_filter)
    
    if route_name:
        query = query.filter(TransportRoute.route_name.contains(route_name))
    
    if vehicle_number:
        query = query.filter(TransportRoute.vehicle_number == vehicle_number)
    if vehicle_type:
        query = query.filter(TransportRoute.vehicle_type == vehicle_type)
    if capacity_min:
        query = query.filter(TransportRoute.vehicle_capacity >= capacity_min)
    if capacity_max:
        query = query.filter(TransportRoute.vehicle_capacity <= capacity_max)
    
    if driver_name:
        query = query.filter(TransportRoute.driver_name.contains(driver_name))
    if conductor_name:
        query = query.filter(TransportRoute.conductor_name.contains(conductor_name))
    
    if fee_min:
        query = query.filter(TransportRoute.monthly_fee >= fee_min)
    if fee_max:
        query = query.filter(TransportRoute.monthly_fee <= fee_max)
    
    if total_students_min:
        query = query.filter(TransportRoute.total_students >= total_students_min)
    if total_students_max:
        query = query.filter(TransportRoute.total_students <= total_students_max)
    
    total_count = query.count()
    
    if hasattr(TransportRoute, sort_by):
        if sort_order == "desc":
            query = query.order_by(getattr(TransportRoute, sort_by).desc())
        else:
            query = query.order_by(getattr(TransportRoute, sort_by).asc())
    
    routes = query.offset(skip).limit(limit).all()
    
    return {
        "total": total_count,
        "page": skip // limit + 1,
        "page_size": limit,
        "total_pages": (total_count + limit - 1) // limit,
        "data": routes
    }


@router.get("/{route_id}")
async def get_transport_route(
    route_id: int,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_active_user)
):
    """Get single transport route"""
    route = db.query(TransportRoute).filter(TransportRoute.id == route_id).first()
    if not route:
        raise HTTPException(status_code=404, detail="Transport route not found")
    return route


@router.post("/")
async def create_transport_route(
    route_data: dict,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_active_user)
):
    """Create transport route with all data"""
    # Get school name from schools table using school_id
    if route_data.get('school_id'):
        school = db.query(School).filter(School.id == route_data['school_id']).first()
        if school:
            route_data['school_name'] = school.school_name
    
    # Get student names from students table using student_id in student_list
    if route_data.get('student_list'):
        for student_info in route_data['student_list']:
            if student_info.get('student_id'):
                student = db.query(Student).filter(Student.id == student_info['student_id']).first()
                if student:
                    student_info['student_name'] = student.full_name
                    student_info['class'] = student.class_section or f"{student.class_name}-{student.section}"
                    student_info['parent_phone'] = student.father_phone or student.mother_phone or student.guardian_phone
    
    route = TransportRoute(**route_data)
    db.add(route)
    db.commit()
    db.refresh(route)
    return route


@router.put("/{route_id}")
async def update_transport_route(
    route_id: int,
    update_data: dict,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_active_user)
):
    """Update transport route - any field"""
    route = db.query(TransportRoute).filter(TransportRoute.id == route_id).first()
    if not route:
        raise HTTPException(status_code=404, detail="Transport route not found")
    
    # If school_id is updated, fetch school name
    if 'school_id' in update_data:
        school = db.query(School).filter(School.id == update_data['school_id']).first()
        if school:
            update_data['school_name'] = school.school_name
    
    # If student_list is updated, fetch student details
    if 'student_list' in update_data:
        for student_info in update_data['student_list']:
            if student_info.get('student_id'):
                student = db.query(Student).filter(Student.id == student_info['student_id']).first()
                if student:
                    student_info['student_name'] = student.full_name
                    student_info['class'] = student.class_section or f"{student.class_name}-{student.section}"
                    student_info['parent_phone'] = student.father_phone or student.mother_phone or student.guardian_phone
    
    for field, value in update_data.items():
        if hasattr(route, field):
            setattr(route, field, value)
    
    route.updated_at = datetime.now()
    db.commit()
    db.refresh(route)
    return route


@router.delete("/{route_id}")
async def delete_transport_route(
    route_id: int,
    hard_delete: bool = Query(False),
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_active_user)
):
    """Delete transport route"""
    route = db.query(TransportRoute).filter(TransportRoute.id == route_id).first()
    if not route:
        raise HTTPException(status_code=404, detail="Transport route not found")
    
    if hard_delete:
        db.delete(route)
    else:
        route.is_active = False
        route.status = "inactive"
    
    db.commit()
    return {"message": "Transport route deleted successfully"}


@router.get("/filters/by-vehicle-type")
async def get_routes_by_vehicle_type(
    vehicle_type: str,
    school_id: Optional[int] = None,
    db: Session = Depends(get_db)
):
    """Get routes by vehicle type"""
    query = db.query(TransportRoute).filter(TransportRoute.vehicle_type == vehicle_type)
    if school_id:
        query = query.filter(TransportRoute.school_id == school_id)
    return query.all()


@router.get("/filters/underutilized")
async def get_underutilized_routes(
    threshold_percent: int = Query(50, description="Utilization threshold percentage"),
    school_id: Optional[int] = None,
    db: Session = Depends(get_db)
):
    """Get routes with low utilization"""
    query = db.query(TransportRoute)
    if school_id:
        query = query.filter(TransportRoute.school_id == school_id)
    
    all_routes = query.all()
    underutilized = [
        r for r in all_routes 
        if r.vehicle_capacity and r.total_students 
        and (r.total_students / r.vehicle_capacity * 100) < threshold_percent
    ]
    
    return underutilized


@router.get("/stats/summary")
async def get_transport_stats(
    school_id: Optional[int] = None,
    db: Session = Depends(get_db)
):
    """Get transport statistics"""
    query = db.query(TransportRoute)
    if school_id:
        query = query.filter(TransportRoute.school_id == school_id)
    
    all_routes = query.all()
    
    total_capacity = sum(r.vehicle_capacity or 0 for r in all_routes)
    total_students = sum(r.total_students or 0 for r in all_routes)
    
    return {
        "total_routes": len(all_routes),
        "active_routes": sum(1 for r in all_routes if r.is_active),
        "total_vehicles": len(all_routes),
        "buses": sum(1 for r in all_routes if r.vehicle_type == "Bus"),
        "vans": sum(1 for r in all_routes if r.vehicle_type == "Van"),
        "total_capacity": total_capacity,
        "total_students_using_transport": total_students,
        "average_utilization": (total_students / total_capacity * 100) if total_capacity > 0 else 0,
        "total_monthly_revenue": sum(r.monthly_fee * r.total_students if r.monthly_fee and r.total_students else 0 for r in all_routes)
    }
