import axios from 'axios';
import React from 'react';
import AlertError from './partials/alertError';
import { useNavigate } from 'react-router-dom';

export default function Register() {
	const [email, setEmail] = React.useState('');
	const [name, setName] = React.useState('');
	const [password, setPassword] = React.useState('');
	const [confPassword, setConfPassword] = React.useState('');
	const [tc, setTC] = React.useState(false);

	const [alertError, setAlertError] = React.useState({
		isError: false,
		message: '',
	});

	const navigate = useNavigate();

	const handleSubmit = (e) => {
		e.preventDefault();

		function validateEmail(email) {
			const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
			return emailRegex.test(email);
		}

		if (!validateEmail(email))
			return setAlertError({
				isError: true,
				message: 'Perhatikan kembali format email.',
			});

		if (password.length <= 6)
			return setAlertError({
				isError: true,
				message: 'Password minimal 6 karakter.',
			});

		if (password !== confPassword)
			return setAlertError({
				isError: true,
				message: 'Konfirmasi password harus sama.',
			});

		if (!tc)
			return setAlertError({
				isError: true,
				message: 'Harap ceklis syarat dan ketentuan.',
			});

		const sendData = async () => {
			axios
				.post('http://localhost:8080/api/v1/users', {
					email: email,
					name: name,
					password: password,
				})
				.then((response) =>
					response.data.success
						? navigate('/login', {
								replace: true,
								state: { isSuccess: true, message: 'Registerasi berhasil.' },
						  })
						: setAlertError({
								isError: true,
								message: 'Server sedang tidak bekerja. Kembali lagi nanti.',
						  })
				)
				.catch((e) => console.log(e));
		};

		sendData();
	};

	return (
		<section className="bg-gray-100 dark:bg-gray-900">
			{alertError.isError ? (
				<AlertError
					message={alertError.message}
					setAlertError={() => setAlertError({ isError: false, message: '' })}
				/>
			) : (
				''
			)}
			<div className="flex flex-col items-center justify-center px-6 py-8 mx-auto min-h-screen md:h-screen lg:py-0">
				<a
					href="#"
					className="flex items-center mb-6 text-2xl font-semibold text-primary-600 dark:text-white">
					BersihBersama
				</a>
				<div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
					<div className="p-6 space-y-4 md:space-y-6 sm:p-8">
						<h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
							Buat sebuah akun
						</h1>
						<form
							className="space-y-4 md:space-y-6"
							action="#">
							<div>
								<label
									htmlFor="email"
									className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
									Email Anda
								</label>
								<input
									type="email"
									name="email"
									id="email"
									className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
									placeholder="name@mail.com"
									required=""
									value={email}
									onChange={(e) => setEmail(e.target.value)}
								/>
							</div>
							<div>
								<label
									htmlFor="name"
									className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
									Nama Anda
								</label>
								<input
									type="text"
									name="name"
									id="name"
									className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
									placeholder="Taufik Satya"
									required=""
									value={name}
									onChange={(e) => setName(e.target.value)}
								/>
							</div>
							<div>
								<label
									htmlFor="password"
									className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
									Kata Sandi
								</label>
								<input
									type="password"
									name="password"
									id="password"
									placeholder="••••••••"
									className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
									required=""
									value={password}
									onChange={(e) => setPassword(e.target.value)}
								/>
							</div>
							<div>
								<label
									htmlFor="confirm-password"
									className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
									Konfirmasi Kata Sandi
								</label>
								<input
									type="password"
									name="confirm-password"
									id="confirm-password"
									placeholder="••••••••"
									className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
									required=""
									value={confPassword}
									onChange={(e) => setConfPassword(e.target.value)}
								/>
							</div>
							<div className="flex items-start">
								<div className="flex items-center h-5">
									<input
										id="terms"
										aria-describedby="terms"
										type="checkbox"
										className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
										required=""
										value={tc}
										onChange={() => setTC(!tc)}
									/>
								</div>
								<div className="ml-3 text-sm">
									<label
										htmlFor="terms"
										className="font-light text-gray-500 dark:text-gray-300">
										Saya menyetujui{' '}
										<a
											className="font-medium text-primary-600 hover:underline dark:text-primary-500"
											href="#">
											syarat dan ketentuan
										</a>
									</label>
								</div>
							</div>
							<button
								type="submit"
								onClick={handleSubmit}
								className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
								Buat Akun
							</button>
							<p className="text-sm font-light text-gray-500 dark:text-gray-400">
								Sudah punya akun?{' '}
								<a
									href="/login"
									className="font-medium text-primary-600 hover:underline dark:text-primary-500">
									Masuk di sini
								</a>
							</p>
						</form>
					</div>
				</div>
			</div>
		</section>
	);
}
