import React, { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import axios from 'axios';
import { ErrorAnimation, LoadingAnimation } from '../components';

const Profile = () => {
	const [user, setUser] = useState({});
	const [categories, setCategories] = useState([]);
	const [payments, setPayments] = useState([]);
	const [logo, setLogo] = useState(null);
	const [newCategory, setNewCategory] = useState([]);
	const [oldCategory, setOldCategory] = useState([]);
	const [newPayment, setNewPayment] = useState([]);
	const [oldPayment, setOldPayment] = useState([]);

	// useQuery({
	// 	queryKey: ["user"],
	// 	queryFn: async () => {
	// 		return await axios.get(`${process.env.REACT_APP_API_URL}/api/users`);
	// 	},
	// 	onSuccess: (data) => {
	// 		setUser(data.data.data[0]);
	// 	},
	// 	onError: (error) => {
	// 		console.log(error);
	// 	},
	// });

	// useQuery({
	// 	queryKey: ["category"],
	// 	queryFn: async () => {
	// 		return await axios.get(`${process.env.REACT_APP_API_URL}/api/categories`);
	// 	},
	// 	onSuccess: (data) => {
	// 		setCategories(data.data.data);
	// 	},
	// 	onError: (error) => {
	// 		console.log(error);
	// 	},
	// });

	// useQuery({
	// 	queryKey: ["payment"],
	// 	queryFn: async () => {
	// 		return await axios.get(`${process.env.REACT_APP_API_URL}/api/payment_types`);
	// 	},
	// 	onSuccess: (data) => {
	// 		setPayments(data.data.data);
	// 	},
	// 	onError: (error) => {
	// 		console.log(error);
	// 	},
	// });

	const { data, isLoading, isError } = useQuery(
    ["profileData"],
    async () => {
      const [userData, categoryData, paymentData] = await Promise.all([
        axios.get(`${process.env.REACT_APP_API_URL}/api/users`),
        axios.get(`${process.env.REACT_APP_API_URL}/api/categories`),
        axios.get(`${process.env.REACT_APP_API_URL}/api/payment_types`),
      ]);

      setUser(userData.data.data[0]);
      setCategories(categoryData.data.data);
      setPayments(paymentData.data.data);

      return {
        user: userData.data.data[0],
        categories: categoryData.data.data,
        payments: paymentData.data.data,
      };
    },
    {
      onError: (error) => {
        console.log(error);
      },
    }
  );

	const editProfile = useMutation({
		mutationFn: async (data) => {
			return await axios.put(`${process.env.REACT_APP_API_URL}/api/users/${data.id}`, data);
		},
	});

	const editLogo = useMutation({
		mutationFn: async (data) => {
			return await axios.put(`${process.env.REACT_APP_API_URL}/api/users/logo/${user.id}`, {"logo": data});
		},
	});

	const addCategory = useMutation({
		mutationFn: async (data) => {
			return await axios.post(`${process.env.REACT_APP_API_URL}/api/categories`, data);
		},
	});

	const deleteCategory = useMutation({
		mutationFn: async (data) => {
			return await axios.delete(`${process.env.REACT_APP_API_URL}/api/categories/${data}`);
		},
	});

	const addPayment = useMutation({
		mutationFn: async (data) => {
			return await axios.post(`${process.env.REACT_APP_API_URL}/api/payment_types`, data);
		},
	});

	const deletePayment = useMutation({
		mutationFn: async (data) => {
			return await axios.delete(`${process.env.REACT_APP_API_URL}/api/payment_types/${data}`);
		},
	});

  const handleFileChange = (event) => {
    const file = event.target.files[0];
		const reader = new FileReader();

		reader.onloadend = () => {
			setLogo(reader.result);
		};

		reader.readAsDataURL(file);
  };

	const handleChangeCategory = (event) => {
		const dataString = event.target.value;
		const dataArray = dataString.split(", ");

		const addCategory = dataArray.filter(item => !categories.some(category => category.name === item));
		const deleteCategory = categories.filter(item => !dataArray.some(name => name === item.name)).map(item => item.id);

		setNewCategory(addCategory);
		setOldCategory(deleteCategory);
	};

	const handleChangePayment = (event) => {
		const dataString = event.target.value;
		const dataArray = dataString.split(", ");

		const addPayment = dataArray.filter(item => !payments.some(payment => payment.name === item));
		const deletePayment = payments.filter(item => !dataArray.some(name => name === item.name)).map(item => item.id);

		setNewPayment(addPayment);
		setOldPayment(deletePayment);
	};

	// const onClickSaveHandler = () => {
	// 	editProfile.mutate(user);

	// 	if (logo) {
	// 		editLogo.mutate(logo, {
	// 			onSuccess: () => {
	// 				window.location.reload();
	// 			},
	// 		});
	// 	}

	// 	if (newCategory.length > 0) {
	// 		newCategory.forEach(item => {
	// 			addCategory.mutate({"name": item});
	// 		});
	// 	}

	// 	if (oldCategory.length > 0) {
	// 		oldCategory.forEach(item => {
	// 			deleteCategory.mutate(item);
	// 		});
	// 	}

	// 	if (newPayment.length > 0) {
	// 		newPayment.forEach(item => {
	// 			addPayment.mutate({"name": item});
	// 		});
	// 	}

	// 	if (oldPayment.length > 0) {
	// 		oldPayment.forEach(item => {
	// 			deletePayment.mutate(item);
	// 		});
	// 	}

	// 	toast.success("Profile updated successfully!");
	// };

	const onClickSaveHandler = async () => {
    try {
      await editProfile.mutate(user);

      if (logo) {
        await editLogo.mutate(logo);
      }

      if (newCategory.length > 0) {
        await Promise.all(
          newCategory.map((item) => addCategory.mutate({ name: item }))
        );
      }

      if (oldCategory.length > 0) {
        await Promise.all(
          oldCategory.map((item) => deleteCategory.mutate(item))
        );
      }

      if (newPayment.length > 0) {
        await Promise.all(
          newPayment.map((item) => addPayment.mutate({ name: item }))
        );
      }

      if (oldPayment.length > 0) {
        await Promise.all(
          oldPayment.map((item) => deletePayment.mutate(item))
        );
      }

      toast.success("Profile updated successfully!");
    } catch (error) {
			toast.error("Profile updated failed! Error: ", error.message);
    }
  };

	if (isLoading) return (<LoadingAnimation />);
	if (isError) return (<ErrorAnimation />);

	return (
		<div className='p-6 relative'>
			<div className='flex items-center min-h-[18.75rem] bg-center bg-cover bg-profile rounded-2xl overflow-hidden'></div>
			<div className='text-black text-opacity-[0.87] transition-shadow duration-300 delay-[0ms] overflow-hidden flex flex-col min-w-0 break-words bg-clip-border border-0 rounded-2xl backdrop-saturate-200 backdrop-blur-[30px] bg-white bg-opacity-80 shadow-md -mt-[64px] mx-6 p-4 dark:bg-secondary-dark-bg'>
				<div className='box-border flex flex-row flex-wrap items-center'>
					<div className='justify-center leading-[1] select-none transition-all duration-200 ease-in-out delay-[0ms] rounded-xl font-bold shadow w-[4.625rem] h-[4.625rem] text-base'>
						<img 
							className='w-full text-center object-cover indent-[10000px] h-auto rounded-xl'
							src={user.logo}
							alt='photo_profile'
						/>
					</div>
					<div className='h-full leading-[1] pl-6 text-[#344767] dark:text-white'>
						<h5 className='text-xl leading-snug tracking-normal font-medium text-[#344767] dark:text-white'>
							{user.name}
						</h5>
						<span className='text-sm leading-normal tracking-[0.02857em] text-[#344767] dark:text-white font-medium'>
							Vape Store
						</span>
					</div>
				</div>
			</div>
			<div className='mt-10 mb-6'>
				<div className='box-border flex flex-row flex-wrap'>
					<div className='md:px-6 pb-6 px-3 flex-grow-0 box-border basis-full max-w-full'>
						<div className='text-black text-opacity-[0.87] transition-shadow duration-300 delay-[0ms] overflow-hidden flex flex-col relative min-w-0 break-words bg-white box-border border-0 rounded-2xl shadow-md dark:bg-secondary-dark-bg'>
							<div className='pt-4 px-4 text-[#344767] dark:text-white'>
								<h6 className='text-base leading-relaxed tracking-[0.0075em] font-medium'>
									Profile Settings
								</h6>
							</div>
							<div className='px-4 pt-4 leading-tight text-[#344767]'>
								<div className='flex flex-row gap-8 align-middle items-center'>
									<img 
										className='text-center object-cover indent-[10000px] rounded-xl shadow w-[4.625rem] h-[4.625rem]'
										src={user.logo}
										alt='photo_profile'
									/>
									<input
										className='dark:text-white'
										type="file"
										id="img"
										name="img"
										accept="image/*"
										onChange={handleFileChange}
									/>
								</div>
							</div>
							<label
								className='px-4 pt-4 text-sm leading-normal tracking-[0.02857em] text-[#344767] dark:text-white font-bold'
							>
								Store Name
							</label>
							<div className='pt-1 px-4'>
								<input
									type='text'
									className='border-solid border-1 w-[50%] bg-transparent dark:text-white'
									defaultValue={user.name}
									onChange={(e) => {
										setUser({ ...user, name: e.target.value });
									}}
								/>
							</div>
							<label
								className='px-4 pt-4 text-sm leading-normal tracking-[0.02857em] text-[#344767] dark:text-white font-bold'
							>
								Phone Number
							</label>
							<div className='pt-1 px-4'>
									<input
										type='text'
										className='border-solid border-1 w-[50%] dark:text-white bg-transparent'
										defaultValue={user.phone_number}
										onChange={(e) => {
											setUser({ ...user, phone_number: e.target.value });
										}}
									/>
							</div>
							<label
								className='px-4 pt-4 text-sm leading-normal tracking-[0.02857em] text-[#344767] dark:text-white font-bold'
							>
								Email
							</label>
							<div className='pt-1 px-4'>
								<input
									type='text'
									className='border-solid border-1 w-[50%] dark:text-white bg-transparent'
									defaultValue={user.email}
									onChange={(e) => {
										setUser({ ...user, email: e.target.value });
									}}
								/>
							</div>
							<label
								className='px-4 pt-4 text-sm leading-normal tracking-[0.02857em] text-[#344767] dark:text-white font-bold'
							>
								Addres
							</label>
							<div className='pt-1 px-4 pb-4'>
								<textarea
									className='border-solid border-1 w-[50%] dark:text-white bg-transparent'
									defaultValue={user.address}
									onChange={(e) => {
										setUser({ ...user, address: e.target.value });
									}}
								/>
							</div>
							<div className='pt-4 px-4 text-[#344767] dark:text-white'>
								<h6 className='text-base leading-relaxed tracking-[0.0075em] font-medium'>
									Store Settings
								</h6>
							</div>
							<label
								className='px-4 pt-4 text-sm leading-normal tracking-[0.02857em] text-[#344767] dark:text-white font-bold'
							>
								Items Category
							</label>
							<div className='pt-1 px-4'>
								<input
									type='text'
									className='border-solid border-1 w-[50%] dark:text-white bg-transparent'
									defaultValue={categories.map(category => category.name).join(', ')}
									onChange={handleChangeCategory}
									// disabled
								/>
							</div>
							<label
								className='px-4 pt-4 text-sm leading-normal tracking-[0.02857em] text-[#344767] dark:text-white font-bold'
							>
								Payment Method
							</label>
							<div className='pt-1 px-4 pb-6'>
								<input
									type='text'
									className='border-solid border-1 w-[50%] dark:text-white bg-transparent'
									defaultValue={payments.map(payment => payment.name).join(', ')}
									onChange={handleChangePayment}
									// disabled
								/>
							</div>
							<div className='p-4 text-right'>
								<button
									type='button'
									className='bg-green-300 rounded-lg px-4 py-1 text-green-700 text-base tracking-wider font-semibold shadow-md hover:scale-105 hover:bg-green-200 hover:text-green-600'
									onClick={onClickSaveHandler}
								>
									Save
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Profile;
