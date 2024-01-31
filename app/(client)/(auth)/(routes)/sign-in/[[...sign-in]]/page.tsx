import { SignIn } from "@clerk/nextjs";


export default function Page({searchParams}: {searchParams: {redirectUrl: string | undefined}}) {
  const {redirectUrl} = searchParams;
  return (
    <main className="grid place-content-center min-h-screen">
      <SignIn redirectUrl={redirectUrl || "/"}/>
    </main>
  );
}



// the redirectUrl parameter provided by nextjs so that the user 
//can be redirected back to the page they were visiting before or home if there isn’t any.