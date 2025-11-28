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
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm p-3">
      <form
        onSubmit={handleSubmit}
        className="relative w-full max-w-5xl bg-white rounded-2xl shadow-2xl p-6 sm:p-8 max-h-[92vh] overflow-y-auto"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Cột trái - Thông tin khách hàng */}
          <div className="space-y-5">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
              Nhập thông tin khách hàng
            </h2>

            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Họ và tên <span className="text-red-500">*</span>
                </label>
                <input
                  name="name"
                  required
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Địa chỉ <span className="text-red-500">*</span>
                </label>
                <input
                  name="address"
                  required
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Tỉnh / Thành phố <span className="text-red-500">*</span>
                </label>
                <input
                  name="city"
                  required
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Số điện thoại <span className="text-red-500">*</span>
                </label>
                <input
                  name="phone"
                  required
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                />
              </div>
            </div>

            <label className="flex items-center space-x-2 text-sm text-gray-700">
              <input
                type="checkbox"
                name="shipToOther"
                onChange={handleChange}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
              />
              <span>Giao hàng tới địa chỉ khác?</span>
            </label>

            <textarea
              name="note"
              placeholder="Ghi chú đơn hàng: Quà tặng, VAT..."
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition resize-none"
            />

            <div className="text-sm space-y-2">
              <h3 className="font-semibold text-gray-700">Chọn cách nhận hàng</h3>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="method"
                  value="pickup"
                  checked={form.method === "pickup"}
                  onChange={handleChange}
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-2 focus:ring-blue-500"
                />
                <span>Giữ hàng tại cửa hàng</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="method"
                  value="delivery"
                  checked={form.method === "delivery"}
                  onChange={handleChange}
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-2 focus:ring-blue-500"
                />
                <span>Giao hàng tận nơi</span>
              </label>
            </div>

            <label className="flex items-center space-x-2 text-sm text-gray-700">
              <input
                type="checkbox"
                name="isHuman"
                onChange={handleChange}
                className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-2 focus:ring-green-500"
              />
              <span>Tôi không phải là người máy</span>
            </label>
          </div>

          {/* Cột phải - QR Code */}
          <div className="flex flex-col items-center justify-center text-center border border-gray-200 rounded-xl p-6 shadow-sm bg-gray-50">
            <h3 className="font-semibold text-lg sm:text-xl mb-4 text-gray-800">
              Thanh toán qua QR Code
            </h3>
            <div className="flex items-center justify-center mb-3">
              <Image
                src="/qrcode/momo.jpg"
                alt="QR Code thanh toán"
                width={220}
                height={220}
                className="rounded-xl w-44 h-44 sm:w-52 sm:h-52 object-cover shadow"
              />
            </div>
            <p className="text-xs sm:text-sm text-gray-500">
              * Quét mã bằng app ngân hàng để thanh toán trực tuyến
            </p>
          </div>
        </div>

        {/* Nút */}
        <div className="pt-6 flex flex-col sm:flex-row justify-between gap-4">
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg text-sm font-semibold w-full sm:w-1/2 shadow-md transition"
          >
            Xác nhận
          </button>
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 px-6 rounded-lg text-sm font-medium w-full sm:w-1/2 shadow-sm transition"
          >
            Hủy
          </button>
        </div>
      </form>
    </div>
  );
}
