import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import Login from './Login'
import { toast } from "react-toastify";
import { loginUserApi } from "../../api/Api";

//mock the api.js file
jest.mock('../../api/Api')
//List of test cases
describe('Login Component', () => {
    //Clearing all mock
    afterEach(() => {
        jest.clearAllMocks()
    })
})

//Test 1
it('Shold Display error toast message on login fail!', async () => {

    //rendering login page/components
    render(<Login />)
    //first , we have to make a response
    const mockResponse = {
        data: {
            'success': false,
            'message': 'Incorrect Password!'
        }
    }

    //config Mock response
    loginUserApi.mockResolvedValue(mockResponse)

    //Config toast.error
    toast.error = jest.fn();

    // Finding email,password,login button from screen
    const email = await screen.findByAltText('Enter your email address')
    const password = await screen.findByAltText('Enter your password')
    const loginBtn = screen.getByText('Login')

    //Simulate ,filling input logically
    fireEvent.change(email, {
        target: {
            value: 'test@gmail.com'

        }

    })
    fireEvent.change(password, {
        target: {
            value: '123456'

        }
    })
    fireEvent.click(loginBtn)

    //we have finished  process above
    //next is ,ensuring all above test are working fine!
    await waitFor(()=>{
        //expect api call with data ,we entered/change
        expect(loginUserApi).toHaveBeenCalledWith({email:'ansh091rock@gmail.com',password:'123456'})
    })
})
