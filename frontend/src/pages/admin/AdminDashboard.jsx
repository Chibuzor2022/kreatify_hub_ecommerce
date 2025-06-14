const AdminDashboard = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <ul className="space-y-2">
        <li><a href="/admin/productlist" className="text-blue-600 hover:underline">Manage Products</a></li>
        <li><a href="/admin/orders" className="text-blue-600 hover:underline">Manage Orders</a></li>
        <li><a href="/admin/userlist" className="text-blue-600 hover:underline">Manage Users</a></li>
      </ul>
    </div>
  );
};

export default AdminDashboard;
