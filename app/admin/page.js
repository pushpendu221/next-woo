import React from "react";
import DashboardCard from "./_components/dashboardCard";
import { prisma } from "@/lib/prisma";

async function getExportData() {
  const data = await prisma.order.aggregate({
    _sum: { pricePaidInRupees: true },
    _count: true,
  });
  return {
    amount: data._sum.pricePaidInRupees,
    numberOfSales: data._count,
  };
}
async function getCustomerData() {
  const [totalCustomers, totalOrders] = await Promise.all([
    prisma.user.count(),
    prisma.order.aggregate({
      _sum: { pricePaidInRupees: true },
    }),
  ]);

  return {
    totalCustomers,
    averageValuePerUser:
      totalCustomers === 0
        ? 0
        : (totalOrders._sum.pricePaidInRupees || 0) / totalCustomers,
  };
}

async function getProductData() {
  const [activeProducts, inActiveProducts] = await Promise.all([
    prisma.product.count({ where: { isAvailableForPurchase: true } }),
    prisma.product.count({ where: { isAvailableForPurchase: false } }),
  ]);
  return {
    activeProducts,
    inActiveProducts,
  };
}
export default async function Admin() {
  const [salesData, customerData, orderData] = await Promise.all([
    getExportData(),
    getCustomerData(),
    getProductData(),
  ]);

  return (
    <>
      <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 p-3 justify-center items-center">
        <DashboardCard
          title="Total Sales"
          description={`Total Number of Sales: ₹${salesData.numberOfSales || 0}`}
          content={`Total sales Amount: ₹${salesData.amount || 0}`}
        />
        <DashboardCard
          title="Customers"
          description={`Total customers : ${customerData.totalCustomers || 0}`}
          content={`Average Value Per User: ₹${customerData.averageValuePerUser || 0}`}
        />
        <DashboardCard
          title="Active Products"
          description={`Total Inactive Products:${orderData.inActiveProducts || 0}`}
          content={`Total Active Products: ${orderData.activeProducts || 0}`}
        />
      </div>
    </>
  );
}
