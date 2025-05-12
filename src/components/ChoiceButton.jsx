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

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`p-2 transition-all duration-200 flex items-center justify-center h-28 w-28`} // removed background, added padding
      onClick={() => onClick(choice)}
      disabled={disabled}
    >
      <img
        src={getChoiceImage()}
        alt={choice}
        className="h-24 w-24 object-contain" // increased image size
      />
    </motion.button>
  );
};

export default ChoiceButton;