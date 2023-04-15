import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { GitHubButton } from '../components/GitHubButton';
import { Octokit } from 'octokit';
import { RepoCard } from '../components/RepoCard';

const User = () => {
  const router = useRouter();
  const ok = new Octokit({ });
  const { user } = router.query;

  var [userdata, setUserdata]: any = useState(null);
  var [repos, setRepos]: any[] = useState(null);

  

  useEffect(() => {
    if (user) {
        ok.request(`GET /users/${user}`.replace("@", ""))
        .then((val) => setUserdata(val.data))
        .catch((error) => {console.error(error); return errorScreen();});
        ok.request(`GET /users/${user}/repos`.replace("@", ""))
        .then((val) => setRepos(val.data))
        .catch((error) => {console.error(error); return errorScreen();});
    }
  }, [user, repos]);

  if (!userdata) {
    return errorScreen();
  }

  return (
    <>
      <Head>
        <title>gitsum | {user}</title>
      </Head>
      <div className="max-w-[800px] mx-auto flex flex-col justify-center text-white font-semibold">
        <a href={userdata.html_url}><h1 className="mono text-center underline underline-offset-1 hover:underline-offset-4 focus:underline-offset-4 transition-all duration-200">{ ( userdata.name ? `${userdata.name} (@${userdata.login})` : `@${userdata.login}` ) }</h1></a>
        <h2 className="mono italic text-center">{userdata.bio}</h2>

        <br />

        <span className="mono text-center">{userdata.public_repos} public repos | {userdata.followers} followers</span>

        <p className="mono text-gray-500 text-center">-----------------------------</p>

        <h3 className="mono">{userdata.login}&apos;s repos</h3>

        {(repos ? repos.map((r: any) => RepoCard(r)) : (<p className="mono italic">no public repos...?</p>))}

        <br />

        <p className="mono text-gray-500 text-center">-----------------------------</p>

        <br />
        <h3 className="mono italic text-gray-500">built by @blueysh</h3>
        <GitHubButton />
        <br />
      </div>
    </>
  );
};

function errorScreen() {
  return (
    <>
      <Head>
        <title>gitsum | error</title>
      </Head>
      <div className="w-full h-[100vh] flex flex-col items-center justify-center text-white font-semibold">
        <h1 className="mono">error</h1>
        <h2 className="mono italic text-center">
          something went wrong finding that user! did you misspell the username?
        </h2>
      </div>
    </>
  );
}

export default User;
