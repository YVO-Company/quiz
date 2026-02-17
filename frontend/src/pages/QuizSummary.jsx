
import { useLocation, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import AdComponent from '../components/AdComponent';

const QuizSummary = () => {
    const location = useLocation();
    const { score, total, mode } = location.state || {}; // Expecting state from navigation

    // Fallback if accessed directly or refreshed without state, try reading from session
    // However, it's safer to rely on session for history and passed state for score/total to be consistent
    const history = JSON.parse(sessionStorage.getItem(`quiz_history_${mode}`) || '[]');

    if (!mode && history.length === 0) {
        return <Navigate to="/" />;
    }

    return (
        <div className="min-h-screen bg-gray-50 py-10 px-4">
            <div className="max-w-3xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <Link to="/result" state={{ score, total, mode }} className="flex items-center text-blue-600 font-bold hover:underline">
                        ⬅ Back to Results
                    </Link>
                    <h1 className="text-3xl font-black text-gray-800">Quiz Summary 📜</h1>
                </div>

                <div className="bg-white rounded-3xl shadow-xl overflow-hidden mb-8 border-4 border-white ring-4 ring-blue-50">
                    <div className="p-6 md:p-8">
                        {history.length === 0 ? (
                            <div className="text-center py-10 text-gray-500">
                                <p className="text-xl">No history found.</p>
                                <Link to="/" className="mt-4 inline-block text-blue-500 font-bold">Go Home</Link>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                {history.map((item, index) => (
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        key={index}
                                        className={`p-4 rounded-2xl border-l-8 ${item.isCorrect ? 'bg-green-50 border-green-400' : 'bg-red-50 border-red-400'} shadow-sm`}
                                    >
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className="text-lg font-bold text-gray-800">Question {index + 1}</h3>
                                            <span className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wide ${item.isCorrect ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}>
                                                {item.isCorrect ? 'Correct ✅' : 'Wrong ❌'}
                                            </span>
                                        </div>
                                        <p className="text-gray-700 text-lg mb-3 font-medium">{item.question}</p>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                            <div className={`p-3 rounded-xl ${item.isCorrect ? 'bg-green-100 text-green-900 font-bold ring-2 ring-green-200' : 'bg-red-100 text-red-900 font-bold ring-2 ring-red-200'}`}>
                                                <span className="block text-xs uppercase opacity-70 mb-1">Your Answer:</span>
                                                {item.selectedOption || 'Time Up ⏳'}
                                            </div>
                                            {!item.isCorrect && (
                                                <div className="p-3 rounded-xl bg-green-100 text-green-900 font-bold ring-2 ring-green-200">
                                                    <span className="block text-xs uppercase opacity-70 mb-1">Correct Answer:</span>
                                                    {item.correctOption}
                                                </div>
                                            )}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <div className="text-center mb-10">
                    <Link to="/select-mode" className="inline-block bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-full font-bold text-lg shadow-lg hover:shadow-xl hover:-translate-y-1 transition transform">
                        🔄 Play Again
                    </Link>
                </div>

                <AdComponent className="w-full h-24 bg-white/50 rounded-xl" />
            </div>
        </div>
    );
};

export default QuizSummary;
