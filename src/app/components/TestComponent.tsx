import React from "react";
import { motion } from "framer-motion";

const TestComponent: React.FC = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
        >
            Hello, World!
        </motion.div>
    );
};

export default TestComponent;
