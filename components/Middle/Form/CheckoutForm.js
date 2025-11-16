import { useState } from "react";
import Image from "next/image";

export default function CheckoutForm({ onClose }) {
  const [form, setForm] = useState({
    name: "",
    address: "",
    city: "",
    phone: "",
    note: "",
    shipToOther: false,
    method: "pickup",
    isHuman: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.isHuman) {
      alert("Vui lòng xác nhận bạn không phải người máy.");
      return;
    }
    alert("Đặt hàng thành công!");
    onClose(); // Đóng form sau khi đặt hàng thành công
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm">
      <form
        onSubmit={handleSubmit}
        className="relative w-full max-w-5xl bg-white rounded-lg shadow-xl p-6 max-h-[90vh] overflow-y-auto"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Cột trái - Thông tin khách hàng */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold">Nhập thông tin khách hàng</h2>

            <div>
              <label className="block text-sm font-medium">
                Họ và tên <span className="text-red-500">*</span>
              </label>
              <input
                name="name"
                required
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">
                Địa chỉ <span className="text-red-500">*</span>
              </label>
              <input
                name="address"
                required
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">
                Tỉnh / Thành phố <span className="text-red-500">*</span>
              </label>
              <input
                name="city"
                required
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">
                Số điện thoại <span className="text-red-500">*</span>
              </label>
              <input
                name="phone"
                required
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </div>

            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="shipToOther"
                onChange={handleChange}
              />
              <span>Giao hàng tới địa chỉ khác?</span>
            </label>

            <textarea
              name="note"
              placeholder="Ghi chú đơn hàng: Quà tặng, VAT..."
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />

            <div>
              <h3 className="font-semibold">Chọn cách nhận hàng</h3>
              <label className="block">
                <input
                  type="radio"
                  name="method"
                  value="pickup"
                  checked={form.method === "pickup"}
                  onChange={handleChange}
                />
                <span className="ml-2">Giữ hàng tại cửa hàng</span>
              </label>
              <label className="block">
                <input
                  type="radio"
                  name="method"
                  value="delivery"
                  checked={form.method === "delivery"}
                  onChange={handleChange}
                />
                <span className="ml-2">Giao hàng tận nơi</span>
              </label>
            </div>

            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="isHuman"
                onChange={handleChange}
              />
              <span>Tôi không phải là người máy</span>
            </label>
          </div>

          {/* Cột phải - QR Code */}
          <div className="flex flex-col items-center justify-center text-center border rounded p-4 shadow-sm">
            <h3 className="font-semibold text-lg mb-3">Thanh toán qua QR Code</h3>
            <div className="flex items-center justify-center mb-2">
              <Image
                src="/qrcode/momo.jpg"
                alt="QR Code thanh toán"
                width={220}
                height={220}
                className="rounded"
              />
            </div>
            <p className="text-sm text-gray-500">
              * Quét mã bằng app ngân hàng để thanh toán trực tuyến
            </p>
          </div>
        </div>

        {/* Nút xác nhận & hủy trong cột trái */}
        <div className="pt-4 flex justify-between gap-4">
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded w-1/2 text-sm font-semibold"
          >
            Xác nhận
          </button>
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 px-4 rounded w-1/2 text-sm font-medium"
          >
            Hủy
          </button>
        </div>
      </form>
    </div>
  );
}