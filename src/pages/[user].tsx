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
      <div className="max-w-[550px] py-10 mx-auto flex flex-col justify-center text-white font-semibold">
        <a href={userdata.html_url}><h1 className="mono text-center underline underline-offset-1 hover:underline-offset-4 focus:underline-offset-4 transition-all duration-200">{ ( userdata.name ? `${userdata.name} (@${userdata.login})` : `@${userdata.login}` ) }</h1></a>
        <h2 className="mono italic text-center">{userdata.bio}</h2>

        <br />

        <span className="mono text-center">{userdata.public_repos} public repos | {userdata.followers} followers | {userdata.public_gists} public gists</span>

        <p className="mono text-gray-500 text-center">-----------------------------</p>

        { ( userdata.location ? (<span className="mono text-center">location: { userdata.location }</span>) : <></> ) }
        { ( userdata.company ? (<span className="mono text-center">works at { userdata.company }</span>) : <></> ) }
        { ( userdata.blog ? (<a href={ ( (userdata.blog.startsWith("https://") || userdata.blog.startsWith("http://")) ? userdata.blog : `${userdata.blog}` ) } className="mono text-center"><span>has a website: <span className="mono underline underline-offset-1 hover:underline-offset-4 focus:underline-offset-4 transition-all duration-200">{ userdata.blog }</span></span></a>) : <></> ) }
        <span className="mono text-center">{ ( userdata.twitter_username ? (<a href={`https://twitter.com/${userdata.twitter_username}`} className="mono text-center"><span>twitter: <span className="mono underline underline-offset-1 hover:underline-offset-4 focus:underline-offset-4 transition-all duration-200">{ userdata.twitter_username }</span></span></a>) : "no twitter username" ) }</span>

        <p className="mono text-gray-500 text-center">-----------------------------</p>

        <h3 className="mono text-center">{userdata.login}&apos;s repos</h3>

        {(repos ? repos.map((r: any) => RepoCard(r)) : (<p className="mono italic text-center">no public repos...?</p>))}

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
