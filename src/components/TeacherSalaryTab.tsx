import { Card } from './ui/card';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { DollarSign } from 'lucide-react';

interface TeacherSalaryTabProps {
  teacher: any;
  isEditing?: boolean;
  onFieldChange?: (field: string, value: any) => void;
}

export function TeacherSalaryTab({ teacher, isEditing = false, onFieldChange }: TeacherSalaryTabProps) {
  const handleChange = (field: string, value: any) => {
    if (onFieldChange) {
      onFieldChange(field, value);
    }
  };

  return (
    <div className="space-y-6">
      {/* Bank Details */}
      <Card className="p-6">
        <h3 className="mb-6">Bank Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <Label className="text-gray-500 mb-2 block">Account Holder Name</Label>
            {isEditing ? (
              <Input 
                value={teacher.bankAccountHolderName || teacher.firstName + ' ' + teacher.lastName} 
                onChange={(e) => handleChange('bankAccountHolderName', e.target.value)}
              />
            ) : (
              <p className="text-gray-900">{teacher.bankAccountHolderName || teacher.firstName + ' ' + teacher.lastName}</p>
            )}
          </div>
          <div>
            <Label className="text-gray-500 mb-2 block">Bank Name</Label>
            {isEditing ? (
              <Input 
                value={teacher.bankName || ''} 
                onChange={(e) => handleChange('bankName', e.target.value)}
              />
            ) : (
              <p className="text-gray-900">{teacher.bankName || '-'}</p>
            )}
          </div>
          <div>
            <Label className="text-gray-500 mb-2 block">Branch Name</Label>
            {isEditing ? (
              <Input 
                value={teacher.branchName || ''} 
                onChange={(e) => handleChange('branchName', e.target.value)}
              />
            ) : (
              <p className="text-gray-900">{teacher.branchName || '-'}</p>
            )}
          </div>
          <div>
            <Label className="text-gray-500 mb-2 block">Account Number</Label>
            {isEditing ? (
              <Input 
                value={teacher.accountNumber || ''} 
                onChange={(e) => handleChange('accountNumber', e.target.value)}
              />
            ) : (
              <p className="text-gray-900">{teacher.accountNumber || '-'}</p>
            )}
          </div>
          <div>
            <Label className="text-gray-500 mb-2 block">IFSC Code</Label>
            {isEditing ? (
              <Input 
                value={teacher.ifscCode || ''} 
                onChange={(e) => handleChange('ifscCode', e.target.value)}
              />
            ) : (
              <p className="text-gray-900">{teacher.ifscCode || '-'}</p>
            )}
          </div>
        </div>
      </Card>

      {/* Salary Details */}
      <Card className="p-6">
        <h3 className="mb-6">Salary Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <Label className="text-gray-500 mb-2 block">Salary Type</Label>
            {isEditing ? (
              <Select value={teacher.salaryType || 'Monthly'} onValueChange={(value) => handleChange('salaryType', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Monthly">Monthly</SelectItem>
                  <SelectItem value="Hourly">Hourly</SelectItem>
                  <SelectItem value="Daily">Daily</SelectItem>
                </SelectContent>
              </Select>
            ) : (
              <p className="text-gray-900">{teacher.salaryType || 'Monthly'}</p>
            )}
          </div>
          <div>
            <Label className="text-gray-500 mb-2 block">Monthly Salary Amount</Label>
            {isEditing ? (
              <Input 
                type="number"
                value={teacher.monthlySalary || ''} 
                onChange={(e) => handleChange('monthlySalary', parseFloat(e.target.value))}
              />
            ) : (
              <p className="text-gray-900 flex items-center gap-1">
                <DollarSign className="h-4 w-4 text-green-600" />
                {teacher.monthlySalary?.toLocaleString('en-IN') || '-'}
              </p>
            )}
          </div>
          <div className="md:col-span-2 lg:col-span-3">
            <Label className="text-gray-500 mb-2 block">Allowances</Label>
            <div className="space-y-2">
              {teacher.allowances?.map((allowance: any, index: number) => (
                <div key={index} className="flex justify-between items-center p-3 bg-green-50 rounded-lg border border-green-200">
                  <span className="text-gray-700">{allowance.name}</span>
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    ₹{allowance.amount.toLocaleString('en-IN')}
                  </Badge>
                </div>
              )) || <p className="text-gray-500">No allowances configured</p>}
            </div>
            {isEditing && (
              <p className="text-xs text-gray-500 mt-2">Edit allowances in the advanced salary editor</p>
            )}
          </div>
          <div className="md:col-span-2 lg:col-span-3">
            <Label className="text-gray-500 mb-2 block">Deductions</Label>
            <div className="space-y-2">
              {teacher.deductions?.map((deduction: any, index: number) => (
                <div key={index} className="flex justify-between items-center p-3 bg-red-50 rounded-lg border border-red-200">
                  <span className="text-gray-700">{deduction.name}</span>
                  <Badge variant="secondary" className="bg-red-100 text-red-800">
                    ₹{deduction.amount.toLocaleString('en-IN')}
                  </Badge>
                </div>
              )) || <p className="text-gray-500">No deductions configured</p>}
            </div>
            {isEditing && (
              <p className="text-xs text-gray-500 mt-2">Edit deductions in the advanced salary editor</p>
            )}
          </div>
          <div className="md:col-span-2 lg:col-span-3">
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <Label className="text-gray-500 mb-2 block">Net Salary</Label>
              <p className="text-2xl text-blue-700 flex items-center gap-2">
                ₹{teacher.netSalary?.toLocaleString('en-IN') || teacher.monthlySalary?.toLocaleString('en-IN') || '-'}
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
