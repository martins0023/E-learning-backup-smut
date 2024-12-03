import Link from "next/link"

import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import { useState, useEffect } from "react";

const Form = ({ type, post, setPost, submitting, handleSubmit,
}) => {

  //check user authencity
  const { data: session } = useSession();

  const [providers, setProviders ] = useState(null);

  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders();

      setProviders(response);
    }

    setUpProviders();
  }, [])
  
  return (
    <><section
      className="w-full max-w-full flex-start flex-col"
    >
      <h1 className="head_text text-left" >
        <span className="blue_gradient" >{type} Post</span>
      </h1>
      <p className="desc text-left max-w-md" >
        {type} and share amazing tips, ideas, update from your organization with the World
      </p>

      {session?.user ? (
        <>
        <form onSubmit={handleSubmit}
          className="mt-10 w-full max-w-2xl flex flex-col gap-7
          glassmorphism">
        <label>
          <span 
          className="font-satoshi font-semibold
          text-base text-gray-700" >Your Unique Share</span>

          <textarea 
            value={post.prompt}
            onChange={(e) => setPost({ ...post, prompt: e.target.value})}
            placeholder="Create your post here..."
            required
            className="form_textarea"
          />
        </label>
        <label>
          <span 
          className="font-satoshi font-semibold
          text-base text-gray-700" >Tag {``}
            <span className="font-normal">
              #product, #service, #tip, #idea 
            </span>
          </span>

          <input
            value={post.tag}
            onChange={(e) => setPost({ ...post, tag: e.target.value})}
            placeholder="#tag"
            required
            className="form_input"
          />
        </label>

        <div className="flex-end mx-3 mb-5 gap-4">
          <Link href="/" className="text-gray-500 text-sm">
            Cancel
          </Link>

          <button 
            type="submit"
            disabled={submitting}
            className="px-6 py-1.5 text-sm bg-primary-orange rounded-full text-white"
          >
            {submitting ? `${type}...` : type}
          </button>

        </div>

        </form>
          </>
        ) : (
        <>
          {providers &&
            Object.values(providers).map((provider) => (

              <>
                <div className="flex flex-col items-center justify-between gap-4 mt-5 mb-5">
                  
                  <button
                    type="button"
                    key={provider.name}
                    onClick={() => signIn(provider.id)}
                    className="black_btn flex-1 flex justify-start gap-3 cursor-pointer"
                  >
                    Sign up with Google

                  </button>
                </div>
              </>
            ))}
        </>
      )}

    </section></>
  )
}

export default Form