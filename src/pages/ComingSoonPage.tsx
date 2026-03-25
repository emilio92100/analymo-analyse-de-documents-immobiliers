const ComingSoonPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 text-center px-6">
      <img src="/logo.png" alt="Analymo" className="w-64 mb-8" />

      <h1 className="text-4xl font-bold mb-4">Analymo arrive bientôt 🚀</h1>

      <p className="text-lg text-gray-600 mb-8">
        Analyse intelligente de documents immobiliers
        <br />
        Lancement en cours...
      </p>

      <div className="w-full max-w-md">
        <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
          <div className="h-full bg-blue-600 w-[70%] animate-pulse"></div>
        </div>
        <p className="mt-3 text-sm text-gray-500">Progression du lancement</p>
      </div>
    </div>
  );
};

export default ComingSoonPage;
