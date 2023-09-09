const Login = () => {
    return (
        <div className="w-[480px] mx-auto rounded-lg overflow-hidden bg-pearl-white text-slate-gray">
            <div className="py-8 px-12">
                <h2 className="text-2xl mb-4 font-bold">Sign in to Chatpal</h2>
                <form action="" className="flex flex-col gap-4">
                    <label htmlFor="email" className="font-semibold">Email*</label>
                    <input type="email" className="rounded p-2 outline-none" />
                    <label htmlFor="password" className="font-semibold">Password*</label>
                    <input type="password" className="rounded p-2 outline-none" />
                    {/* <label htmlFor="pic"></label>
                <input type="text" /> */}
                    <button className="bg-royal-purple p-2 rounded text-pearl-white">Sign in</button>
                    <p>Don&apos;t have an account? Sign up</p>
                    <div className="text-sm">* fields are mandatory</div>
                </form>
            </div>
        </div>
    )
}

export default Login
