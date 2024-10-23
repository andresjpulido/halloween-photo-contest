/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
 
import { createContext } from 'react';

const AppContext =  createContext({
	loading: false,
	setLoading: (_t: any) => {},
	user: { username: null },
	setuser: (_t: any) => {}, 
	images: [],
	setImages: (_t: any) => {},
	image: {url_original:null, title:null, description:null, user:{username:"Anonymous"}},
	setImage: (_t: any) => {},
	isSigninOpen: false,
	setIsSigninOpen: (_t: any) => {},
	isSignupOpen: false,
	setIsSignupOpen: (_t: any) => {}

});

export default AppContext;
