import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { MsalProvider } from "@azure/msal-react";
import { PublicClientApplication, EventType } from "@azure/msal-browser";
import { msalConfig } from "../lib/authConfig";
import { CustomNavigationClient } from "../lib/NavigationClient";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-circular-progressbar/dist/styles.css';
import { SSRProvider } from '@react-aria/ssr';
import "react-datepicker/dist/react-datepicker.css";
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import 'react-vertical-timeline-component/style.min.css';
import 'react-toastify/dist/ReactToastify.css';
import 'react-phone-input-2/lib/style.css'
import 'bootstrap-daterangepicker/daterangepicker.css';
import "datatables.net-dt/css/jquery.dataTables.min.css"
import "datatables.net-buttons-dt/css/buttons.dataTables.min.css";
import "@fullcalendar/common/main.css";
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";
import '../styles/globals.css'
import '../styles/components/index.css'
import '../styles/color.css'

export const msalInstance = new PublicClientApplication(msalConfig);

// Account selection logic is app dependent. Adjust as needed for different use cases.
const accounts = msalInstance.getAllAccounts();
if (accounts.length > 0) {
	msalInstance.setActiveAccount(accounts[0]);
}

msalInstance.addEventCallback((event) => {
	if (event.eventType === EventType.LOGIN_SUCCESS && event.payload.account) {
		const account = event.payload.account;
		msalInstance.setActiveAccount(account);
	}
});

export default function MyApp({ Component, pageProps }) {
	// The next 3 lines are optional. This is how you configure MSAL to take advantage of the router's navigate functions when MSAL redirects between pages in your app
	const router = useRouter();
	const navigationClient = new CustomNavigationClient(router);
	msalInstance.setNavigationClient(navigationClient);

	return (
		<MsalProvider instance={msalInstance}>
			<SSRProvider><Component {...pageProps} /></SSRProvider>
		</MsalProvider>
	);
}

MyApp.propTypes = {
	Component: PropTypes.elementType.isRequired,
	pageProps: PropTypes.object.isRequired,
};