"""
Dynamic Schema Evolution Utility
Automatically adds new columns to database tables when new fields appear in API requests
"""
from sqlalchemy import inspect, text, String, Integer, Float, Boolean, Date, DateTime, Text
from sqlalchemy.orm import Session
from typing import Any, Dict, Type, List
from datetime import date, datetime
import logging

logger = logging.getLogger(__name__)


class DynamicSchemaManager:
    """
    Manages dynamic schema evolution for database tables
    """
    
    # Map Python types to SQLAlchemy column types
    TYPE_MAPPING = {
        str: String(255),
        int: Integer,
        float: Float,
        bool: Boolean,
        date: Date,
        datetime: DateTime,
        type(None): Text,  # Default for unknown types
    }
    
    def __init__(self, db: Session):
        self.db = db
        self.inspector = inspect(db.bind)
    
    def get_table_columns(self, table_name: str) -> List[str]:
        """
        Get list of existing column names for a table
        """
        try:
            columns = self.inspector.get_columns(table_name)
            return [col['name'] for col in columns]
        except Exception as e:
            logger.error(f"Error getting columns for table {table_name}: {e}")
            return []
    
    def get_sqlalchemy_type(self, value: Any) -> str:
        """
        Determine appropriate SQL column type based on Python value
        """
        value_type = type(value)
        
        # Handle None values - default to TEXT
        if value is None:
            return "TEXT"
        
        # Handle string values
        if value_type == str:
            # If string is very long, use TEXT
            if len(value) > 255:
                return "TEXT"
            return "VARCHAR(255)"
        
        # Handle numeric types
        if value_type == int:
            return "INT"
        
        if value_type == float:
            return "FLOAT"
        
        # Handle boolean
        if value_type == bool:
            return "TINYINT(1)"
        
        # Handle datetime objects
        if value_type == datetime:
            return "DATETIME"
        
        if value_type == date:
            return "DATE"
        
        # Default to TEXT for unknown types
        return "TEXT"
    
    def add_column_to_table(self, table_name: str, column_name: str, column_type: str, nullable: bool = True) -> bool:
        """
        Add a new column to an existing table
        
        Args:
            table_name: Name of the table
            column_name: Name of the column to add
            column_type: SQL column type (e.g., 'VARCHAR(255)', 'INT', etc.)
            nullable: Whether the column should be nullable
            
        Returns:
            bool: True if successful, False otherwise
        """
        try:
            # Construct ALTER TABLE query
            null_constraint = "NULL" if nullable else "NOT NULL"
            query = text(f"ALTER TABLE {table_name} ADD COLUMN {column_name} {column_type} {null_constraint}")
            
            # Execute the query
            self.db.execute(query)
            self.db.commit()
            
            logger.info(f"Successfully added column '{column_name}' ({column_type}) to table '{table_name}'")
            return True
            
        except Exception as e:
            logger.error(f"Error adding column '{column_name}' to table '{table_name}': {e}")
            self.db.rollback()
            return False
    
    def sync_model_with_request(self, table_name: str, request_data: Dict[str, Any], 
                                 protected_fields: List[str] = None) -> Dict[str, bool]:
        """
        Synchronize database table with request data by adding missing columns
        
        Args:
            table_name: Name of the table to sync
            request_data: Dictionary of request data
            protected_fields: List of field names that should not be auto-created
            
        Returns:
            Dict with column names as keys and success status as values
        """
        if protected_fields is None:
            protected_fields = ['id', 'created_at', 'updated_at', 'hashed_password']
        
        # Get existing columns
        existing_columns = self.get_table_columns(table_name)
        
        # Track results
        results = {}
        
        # Iterate through request data
        for field_name, field_value in request_data.items():
            # Skip if field already exists
            if field_name in existing_columns:
                continue
            
            # Skip protected fields
            if field_name in protected_fields:
                logger.warning(f"Skipping protected field: {field_name}")
                results[field_name] = False
                continue
            
            # Determine column type
            column_type = self.get_sqlalchemy_type(field_value)
            
            # Add the column
            success = self.add_column_to_table(table_name, field_name, column_type, nullable=True)
            results[field_name] = success
        
        return results


def auto_evolve_schema(db: Session, table_name: str, data: Dict[str, Any]) -> Dict[str, bool]:
    """
    Convenience function to automatically evolve schema based on request data
    
    Usage:
        from utils.dynamic_schema import auto_evolve_schema
        
        # In your POST/PUT endpoint
        auto_evolve_schema(db, "students", student_data.dict())
    
    Args:
        db: Database session
        table_name: Name of the table
        data: Request data dictionary
        
    Returns:
        Dict with column names as keys and success status as values
    """
    manager = DynamicSchemaManager(db)
    return manager.sync_model_with_request(table_name, data)


def get_dynamic_columns(db: Session, table_name: str, exclude_standard: bool = True) -> List[str]:
    """
    Get list of custom/dynamic columns added to a table
    
    Args:
        db: Database session
        table_name: Name of the table
        exclude_standard: If True, excludes standard columns like id, created_at, etc.
        
    Returns:
        List of column names
    """
    manager = DynamicSchemaManager(db)
    columns = manager.get_table_columns(table_name)
    
    if exclude_standard:
        # Standard columns to exclude
        standard_columns = {
            'id', 'created_at', 'updated_at', 'is_active', 'school_id', 'user_id'
        }
        columns = [col for col in columns if col not in standard_columns]
    
    return columns
