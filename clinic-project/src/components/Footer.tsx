const Footer = () => {
  return (
    <footer
      className="bg-gray-800 text-white text-sm pt-10 pb-4 px-6"
      dir="rtl"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        <div>
          <h3 className="font-bold mb-2">کلینیک درمانی</h3>
          <p>ارائه بهترین خدمات درمانی با جدیدترین تکنولوژی‌ها</p>
        </div>

        <div>
          <h3 className="font-bold mb-2">خدمات</h3>
          <ul className="space-y-1">
            <li>معاینه عمومی</li>
            <li>تخصص‌های مختلف</li>
            <li>آزمایشگاه</li>
            <li>تصویربرداری</li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold mb-2">تماس</h3>
          <ul className="space-y-1">
            <li>📞 ۰۲۱-۱۲۳۴۵۶۷۸</li>
            <li>📧 info@clinic.ir</li>
            <li>📍 تهران، خیابان ولیعصر</li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold mb-2">ساعات کاری</h3>
          <ul className="space-y-1">
            <li>شنبه تا چهارشنبه: ۸ صبح تا ۸ شب</li>
            <li>پنج‌شنبه: ۸ صبح تا ۲ بعد‌ازظهر</li>
            <li>جمعه: تعطیل</li>
          </ul>
        </div>
      </div>

      <div className="mt-8 text-center text-gray-400 text-xs border-t border-gray-700 pt-4">
        © ۱۴۰۴ کلینیک درمانی. تمامی حقوق محفوظ است.
      </div>
    </footer>
  );
};

export default Footer;
