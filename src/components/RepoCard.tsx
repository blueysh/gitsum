import { motion } from "framer-motion";

export const RepoCard = (data: any) => {
    return (
        <motion.a
            href={data.html_url}
            target="_blank"
            className="px-15 py-2 bg-indigo-900 text-white text-lg font-normal items-center justify-center rounded-md mt-5"
            whileHover={{ scale: 0.97 }}
            whileTap={{ scale: 0.9 }}
        >
            <h4 className="mono italic">{data.full_name} | {data.stargazers_count} {(data.stargazers_count === 1 ? "star" : "stars")}</h4>
            <p className="mono">{data.description}</p>
        </motion.a>
    );
};
