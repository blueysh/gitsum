import type { NextPage } from "next";
import Head from "next/head";
import { GitHubButton } from "../components/GitHubButton";

const Home: NextPage = () => {
    return (
        <>
            <Head>
                <title>gitsum by blueysh</title>
            </Head>
            <div className="max-w-[550px] py-10 mx-auto flex flex-col items-center justify-center text-white font-semibold">
                <h1 className="text-center"><span className="mono">gitsum</span> by <span className="mono">blueysh</span></h1>
                <h2 className="mono italic text-center">summarize your github presence and gitsum job offers</h2>

                <br/>

                <h3 className="text-center">how to</h3>
                <ul className="text-center">
                    <li><span className="font-normal mono">step 1: know your github username</span></li>
                    <li><span className="font-normal mono">step 2: place it at the end of this url</span></li>
                    <li><span className="font-normal mono">step 3: profit :)</span></li>
                </ul>
                <span className="font-normal mono italic text-center">example: <a href="https://gitsum.blueysh.me/@blueysh"><span className="underline underline-offset-1 focus:underline-offset-4 hover:underline-offset-4 transition-all duration-200">https://gitsum.blueysh.me/@blueysh</span></a></span>

                <GitHubButton />
            </div>
        </>
    );
};

export default Home;
