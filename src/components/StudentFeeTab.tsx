import React from 'react';
import { Card } from './ui/card';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Separator } from './ui/separator';
import { CheckCircle, Download, DollarSign, CreditCard, Smartphone, Wallet, Building } from 'lucide-react';

export function StudentFeeTab() {
  return (
    <div className="space-y-6">
      {/* Fee Overview Cards */}
      <div>
        <h3 className="text-gray-900 mb-4">Payment Overview</h3>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <Card className="p-4 rounded-xl bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
            <Label className="text-gray-600 text-xs mb-2 block">Total Fee</Label>
            <p className="text-gray-900 text-2xl">₹45,000</p>
            <p className="text-xs text-gray-600 mt-1">Academic Year 2024-25</p>
          </Card>

          <Card className="p-4 rounded-xl bg-gradient-to-br from-green-50 to-green-100 border-green-200">
            <Label className="text-gray-600 text-xs mb-2 block">Total Paid</Label>
            <p className="text-gray-900 text-2xl">₹35,000</p>
            <p className="text-xs text-green-600 mt-1">Till date</p>
          </Card>

          <Card className="p-4 rounded-xl bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
            <Label className="text-gray-600 text-xs mb-2 block">Outstanding</Label>
            <p className="text-gray-900 text-2xl">₹10,000</p>
            <Badge className="mt-2 bg-orange-100 text-orange-700 border-orange-300 rounded-full">
              Due Soon
            </Badge>
          </Card>

          <Card className="p-4 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
            <Label className="text-gray-600 text-xs mb-2 block">Next Due Date</Label>
            <p className="text-gray-900 text-xl">Feb 15, 2025</p>
            <p className="text-xs text-gray-600 mt-1">In 12 days</p>
          </Card>

          <Card className="p-4 rounded-xl bg-gradient-to-br from-red-50 to-red-100 border-red-200">
            <Label className="text-gray-600 text-xs mb-2 block">Upcoming Installment</Label>
            <p className="text-gray-900 text-2xl">₹10,000</p>
            <p className="text-xs text-gray-600 mt-1">Term 3 Fee</p>
          </Card>
        </div>
      </div>

      <Separator />

      {/* Fee Structure Breakdown */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-gray-900">Fee Structure Breakdown</h3>
          <Button variant="outline" size="sm" className="gap-2">
            <Download className="w-4 h-4" />
            Download Fee Structure
          </Button>
        </div>
        <Card className="p-5 rounded-xl">
          <div className="space-y-3">
            <div className="flex items-center justify-between py-3 border-b">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <DollarSign className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-900">Tuition Fee</p>
                  <p className="text-xs text-gray-500">4 installments</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-gray-900">₹28,000</p>
                <Badge className="mt-1 bg-green-100 text-green-700 border-green-300 rounded-full">
                  Paid: ₹21,000
                </Badge>
              </div>
            </div>

            <div className="flex items-center justify-between py-3 border-b">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <DollarSign className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-900">Admission Fee</p>
                  <p className="text-xs text-gray-500">One-time</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-gray-900">₹2,000</p>
                <Badge className="mt-1 bg-green-100 text-green-700 border-green-300 rounded-full">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Paid
                </Badge>
              </div>
            </div>

            <div className="flex items-center justify-between py-3 border-b">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <DollarSign className="w-4 h-4 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-900">Books & Uniform Fee</p>
                  <p className="text-xs text-gray-500">Annual</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-gray-900">₹5,000</p>
                <Badge className="mt-1 bg-green-100 text-green-700 border-green-300 rounded-full">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Paid
                </Badge>
              </div>
            </div>

            <div className="flex items-center justify-between py-3 border-b">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <DollarSign className="w-4 h-4 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-900">Transport Fee</p>
                  <p className="text-xs text-gray-500">Route: R-14</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-gray-900">₹8,000</p>
                <Badge className="mt-1 bg-green-100 text-green-700 border-green-300 rounded-full">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Paid
                </Badge>
              </div>
            </div>

            <div className="flex items-center justify-between py-3 border-b">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-red-100 rounded-lg">
                  <DollarSign className="w-4 h-4 text-red-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-900">Exam Fee</p>
                  <p className="text-xs text-gray-500">Annual</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-gray-900">₹1,000</p>
                <Badge className="mt-1 bg-green-100 text-green-700 border-green-300 rounded-full">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Paid
                </Badge>
              </div>
            </div>

            <div className="flex items-center justify-between py-3 border-b">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gray-100 rounded-lg">
                  <DollarSign className="w-4 h-4 text-gray-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-900">Miscellaneous Fee</p>
                  <p className="text-xs text-gray-500">Activities, Library, Lab</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-gray-900">₹1,000</p>
                <Badge className="mt-1 bg-green-100 text-green-700 border-green-300 rounded-full">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Paid
                </Badge>
              </div>
            </div>

            <div className="flex items-center justify-between py-3 bg-green-50 rounded-lg px-3 mt-2">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-900">Concession Applied</p>
                  <p className="text-xs text-green-600">Merit Scholarship 2024</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-green-700">- ₹5,000</p>
                <p className="text-xs text-gray-600">10% discount</p>
              </div>
            </div>

            <div className="flex items-center justify-between py-4 pt-5 border-t-2">
              <p className="text-gray-900">Total Annual Fee</p>
              <p className="text-gray-900 text-xl">₹45,000</p>
            </div>
          </div>
        </Card>
      </div>

      <Separator />

      {/* Payment History */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-gray-900">Payment History</h3>
          <Button variant="outline" className="gap-2">
            <Download className="w-4 h-4" />
            Export Statement
          </Button>
        </div>
        <div className="space-y-3">
          <Card className="p-4 rounded-xl hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-900">Term 2 Tuition Fee</p>
                  <p className="text-xs text-gray-500">Paid on Nov 15, 2024</p>
                  <p className="text-xs text-gray-500">Receipt #: FEE-2024-1156</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Smartphone className="w-3 h-3 text-gray-500" />
                    <span className="text-xs text-gray-500">Payment Mode: UPI</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="text-gray-900">₹7,000</p>
                <Badge className="bg-green-100 text-green-700 border-green-300 rounded-full mt-1">
                  Paid
                </Badge>
                <Button variant="ghost" size="sm" className="mt-2 gap-1">
                  <Download className="w-3 h-3" />
                  Receipt
                </Button>
              </div>
            </div>
          </Card>

          <Card className="p-4 rounded-xl hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-900">Term 1 Tuition Fee + Transport</p>
                  <p className="text-xs text-gray-500">Paid on Aug 10, 2024</p>
                  <p className="text-xs text-gray-500">Receipt #: FEE-2024-0892</p>
                  <div className="flex items-center gap-2 mt-1">
                    <CreditCard className="w-3 h-3 text-gray-500" />
                    <span className="text-xs text-gray-500">Payment Mode: Card</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="text-gray-900">₹15,000</p>
                <Badge className="bg-green-100 text-green-700 border-green-300 rounded-full mt-1">
                  Paid
                </Badge>
                <Button variant="ghost" size="sm" className="mt-2 gap-1">
                  <Download className="w-3 h-3" />
                  Receipt
                </Button>
              </div>
            </div>
          </Card>

          <Card className="p-4 rounded-xl hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-900">Books, Uniform & Registration</p>
                  <p className="text-xs text-gray-500">Paid on Apr 5, 2024</p>
                  <p className="text-xs text-gray-500">Receipt #: FEE-2024-0234</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Building className="w-3 h-3 text-gray-500" />
                    <span className="text-xs text-gray-500">Payment Mode: Bank Transfer</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="text-gray-900">₹13,000</p>
                <Badge className="bg-green-100 text-green-700 border-green-300 rounded-full mt-1">
                  Paid
                </Badge>
                <Button variant="ghost" size="sm" className="mt-2 gap-1">
                  <Download className="w-3 h-3" />
                  Receipt
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>

      <Separator />

      {/* Upcoming Payments */}
      <div>
        <h3 className="text-gray-900 mb-4">Upcoming Payment</h3>
        <Card className="p-5 rounded-xl border-2 border-blue-300 bg-blue-50">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-100 rounded-xl">
                <DollarSign className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-gray-900 mb-1">Term 3 Tuition Fee</p>
                <p className="text-sm text-gray-600">Due Date: Feb 15, 2025</p>
                <div className="flex items-center gap-2 mt-2">
                  <Badge className="bg-orange-100 text-orange-700 border-orange-300 rounded-full">
                    Due in 12 days
                  </Badge>
                </div>
              </div>
            </div>
            <div className="text-right">
              <p className="text-gray-900 text-2xl">₹10,000</p>
            </div>
          </div>
          
          <div className="flex gap-2 mt-4">
            <Button className="flex-1 bg-blue-600 hover:bg-blue-700 rounded-xl gap-2">
              <Wallet className="w-4 h-4" />
              Pay Now
            </Button>
            <Button variant="outline" className="gap-2 rounded-xl">
              <Download className="w-4 h-4" />
              Download Invoice
            </Button>
          </div>

          <div className="mt-4 p-3 bg-white rounded-lg border">
            <p className="text-xs text-gray-600 mb-2">Accepted Payment Methods:</p>
            <div className="flex items-center gap-3 flex-wrap">
              <div className="flex items-center gap-1.5 px-2 py-1 bg-gray-50 rounded">
                <Smartphone className="w-3 h-3 text-gray-600" />
                <span className="text-xs text-gray-700">UPI</span>
              </div>
              <div className="flex items-center gap-1.5 px-2 py-1 bg-gray-50 rounded">
                <CreditCard className="w-3 h-3 text-gray-600" />
                <span className="text-xs text-gray-700">Card</span>
              </div>
              <div className="flex items-center gap-1.5 px-2 py-1 bg-gray-50 rounded">
                <Building className="w-3 h-3 text-gray-600" />
                <span className="text-xs text-gray-700">Bank Transfer</span>
              </div>
              <div className="flex items-center gap-1.5 px-2 py-1 bg-gray-50 rounded">
                <Wallet className="w-3 h-3 text-gray-600" />
                <span className="text-xs text-gray-700">Cash</span>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
