import { motion } from 'framer-motion';

const ChoiceButton = ({ choice, onClick, disabled }) => {
  const getChoiceImage = () => {
    switch (choice) {
      case 'ROCK':
        return '/images/rock.png';
      case 'PAPER':
        return '/images/paper.png';
      case 'SCISSORS':
        return '/images/scissors.png';
      default:
        return '';
    }
  };

  const getChoiceColor = () => {
    switch (choice) {
      case 'ROCK':
        return 'bg-red-500 hover:bg-red-600';
      case 'PAPER':
        return 'bg-blue-500 hover:bg-blue-600';
      case 'SCISSORS':
        return 'bg-green-500 hover:bg-green-600';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`${getChoiceColor()} text-white font-bold py-4 px-6 rounded-full shadow-lg transition-all duration-200 flex items-center justify-center h-24 w-24`}
      onClick={() => onClick(choice)}
      disabled={disabled}
    >
      <img 
        src={getChoiceImage()} 
        alt={choice} 
        className="h-16 w-16 object-contain" 
      />
    </motion.button>
  );
};

export default ChoiceButton;