import { useEffect, useState } from "react";

const ComingSoonPage = () => {
  const totalDays = 30;

  const startDate = new Date("2026-03-25T00:00:00");
  const endDate = new Date(startDate.getTime() + totalDays * 24 * 60 * 60 * 1000);

  const [timeLeft, setTimeLeft] = useState<any>({});
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const now = new Date().getTime();
      const distance = endDate.getTime() - now;
      const elapsed = now - startDate.getTime();
      const total = endDate.getTime() - startDate.getTime();

      let progressValue = (elapsed / total) * 100;
      if (progressValue < 0) progressValue = 0;
      if (progressValue > 100) progressValue = 100;
      setProgress(progressValue);

      if (distance <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((distance / 1000 / 60) % 60),
        seconds: Math.floor((distance / 1000) % 60),
      });
    };

    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#eef4f8] to-[#f8fbfd] px-6">
      <div className="max-w-3xl w-full text-center">
        {/* Logo */}
        <img src="/logo.png" alt="Analymo" className="mx-auto h-24 mb-8" />

        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-white border border-gray-200 rounded-full px-4 py-2 text-sm text-gray-600 mb-6 shadow-sm">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
          Lancement en préparation
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-6xl font-black text-gray-900 leading-tight">Analymo arrive bientôt</h1>

        {/* Subtitle */}
        <p className="mt-6 text-lg text-gray-600 max-w-xl mx-auto">
          Comprenez vos documents immobiliers en quelques secondes et détectez les points clés avant de signer.
        </p>

        {/* Countdown */}
        <div className="grid grid-cols-4 gap-4 mt-10">
          {["days", "hours", "minutes", "seconds"].map((unit) => (
            <div key={unit} className="bg-white rounded-2xl p-4 shadow-sm border">
              <p className="text-2xl font-bold text-gray-900">{String(timeLeft[unit] || 0).padStart(2, "0")}</p>
              <p className="text-xs text-gray-500 uppercase">{unit}</p>
            </div>
          ))}
        </div>

        {/* Progress */}
        <div className="mt-10">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Progression</span>
            <span>{Math.round(progress)}%</span>
          </div>

          <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-black transition-all duration-500" style={{ width: `${progress}%` }} />
          </div>
        </div>

        {/* CTA */}
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-black text-white px-6 py-3 rounded-full font-semibold hover:bg-gray-800 transition">
            Être informé
          </button>

          <button className="border px-6 py-3 rounded-full font-semibold text-gray-700 hover:bg-gray-50 transition">
            Voir un aperçu
          </button>
        </div>
      </div>
    </div>
  );
};

export default ComingSoonPage;
