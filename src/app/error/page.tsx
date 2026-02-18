export default function ErrorPage() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
                <h2 className="mt-6 text-3xl font-extrabold text-red-600">
                    Something went wrong
                </h2>
                <p className="mt-2 text-gray-600">
                    Authentication failed or an unexpected error occurred.
                </p>
                <div className="mt-6">
                    <a href="/login" className="text-indigo-600 hover:text-indigo-500 font-medium">
                        Try logging in again &rarr;
                    </a>
                </div>
            </div>
        </div>
    )
}
