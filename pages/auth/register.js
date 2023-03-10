import Link from 'next/link'
import { useState } from 'react'
import { unAuthPage } from '../../middlewares/authorizationPage'

export async function getServerSideProps(ctx) {
    await unAuthPage(ctx)

    return { props: {} }
}

export default function Register() {
    const [fields, setFields] = useState({
        email: '',
        password: '',
    })

    const [status, setStatus] = useState('')

    async function registerHandler(e) {
        e.preventDefault()

        setStatus('loading')

        if (!fields.email || !fields.password)
            return setStatus('masukkan email & password')

        const registerReq = await fetch('/api/auth/register', {
            method: 'POST',
            body: JSON.stringify(fields),
            headers: {
                'COntent-Type': 'application/json',
            },
        })

        if (!registerReq.ok) return setStatus('error ' + registerReq.status)

        const registerRes = await registerReq.json()

        setStatus('create account success')
    }

    function fieldHandler(e) {
        const name = e.target.getAttribute('name')
        setFields({
            ...fields,
            [name]: e.target.value,
        })
    }

    return (
        <div className="flex h-screen w-full items-center justify-center dark:bg-black">
            <div className="relative">
                <div className="absolute h-full w-full rounded-2xl bg-blue-100 blur-sm dark:bg-blue-900"></div>
                <div className="relative m-[6px] flex flex-col items-center justify-center rounded-xl border-2 border-blue-300 bg-white px-8 pb-10 dark:border-blue-500 dark:bg-black">
                    <h1 className="my-14 text-4xl font-bold dark:text-gray-300">
                        Register
                    </h1>
                    <form
                        className="flex flex-col items-center space-y-5"
                        onSubmit={registerHandler.bind(this)}
                    >
                        <div className="text-base font-medium text-emerald-500">
                            {status}
                        </div>
                        <input
                            name="email"
                            type="text"
                            onChange={fieldHandler.bind(this)}
                            placeholder="Email"
                            className="w-64 rounded-lg border-2 border-gray-300 bg-transparent p-2 dark:border-gray-700"
                            required
                        />
                        <input
                            name="password"
                            type="password"
                            onChange={fieldHandler.bind(this)}
                            placeholder="Password"
                            className="w-64 rounded-lg border-2 border-gray-300 bg-transparent p-2 dark:border-gray-700"
                            required
                        />
                        <button
                            type="submit"
                            className="m-auto overflow-hidden rounded-2xl border-2 border-blue-500 bg-blue-500 py-1 px-10 text-lg font-medium text-white hover:border-blue-500 hover:bg-transparent hover:text-blue-500 active:rounded-2xl active:bg-blue-500 dark:border-blue-700 dark:bg-blue-800"
                        >
                            Register
                        </button>
                    </form>

                    <Link
                        href="/auth/login"
                        className="right-0 bottom-0 mt-3 text-blue-500"
                    >
                        login account
                    </Link>
                </div>
            </div>
        </div>
    )
}
