import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets'
import RelatedDoctors from '../components/RelatedDoctors'
import { toast } from 'react-toastify'
import axios from 'axios'

const Appointment = () => {
    const {docId} = useParams()
    const {doctors, currencySymbol,backendUrl,token,getDoctorsData} = useContext(AppContext)
    const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']
    const navigate = useNavigate()
    const [docInfo, setDocInfo] = useState(null)
    const [docSlots, setDocSlots] = useState([])
    const [slotIndex, setSlotIndex] = useState(0)
    const [slotTime, setSlotTime] = useState('')
    const [paymentMethod, setPaymentMethod] = useState('card') // 'card' or 'cash'
    const [showOTP, setShowOTP] = useState(false)
    const [otp, setOtp] = useState('')
    const [generatedOTP, setGeneratedOTP] = useState('')
    const [showCardForm, setShowCardForm] = useState(false)
    const [cardDetails, setCardDetails] = useState({
        number: '',
        name: '',
        expiry: '',
        cvv: ''
    })

    const fetchDocInfo = async() => {
        const docInfo = doctors.find(doc => doc._id === docId)
        setDocInfo(docInfo)
        console.log(docInfo)
    }

    const getAvailableSlots = async () => {
        setDocSlots([])

        let today = new Date()

        for(let i = 0; i < 7; i++){
            let currentDate = new Date(today)
            currentDate.setDate(today.getDate() + i)

            let endTime = new Date()
            endTime.setDate(today.getDate()+i)
            endTime.setHours(21,0,0,0)

            if(today.getDate() === currentDate.getDate()){
                currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10)
                currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0)
            }
            else{
                currentDate.setHours(10)
                currentDate.setMinutes(0)
            }

            let timeSlots = []

            while(currentDate < endTime){
                let formattedTime = currentDate.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})

                timeSlots.push({
                    datetime: new Date(currentDate),
                    time: formattedTime
                })

                currentDate.setMinutes(currentDate.getMinutes() + 30)
            }

            setDocSlots(prev => ([...prev, timeSlots]))
        }
    }

    const generateOTP = () => {
        const newOTP = Math.floor(1000 + Math.random() * 9000).toString()
        setGeneratedOTP(newOTP)
        setShowOTP(true)
        toast.info(`Your OTP is: ${newOTP}`)
        return newOTP
    }

    const verifyOTP = () => {
        if (otp === generatedOTP) {
            toast.success("OTP verified successfully!")
            bookAppointment()
        } else {
            toast.error("Invalid OTP. Please try again.")
        }
    }

    const handlePaymentSelection = () => {
        if (!slotTime) {
            toast.warn("Please select a time slot first")
            return
        }
        
        if (paymentMethod === 'card') {
            // For card payment, show card form
            setShowCardForm(true)
        } else {
            // For cash on arrival, book directly
            bookAppointment()
        }
    }

    const handleCardPayment = () => {
        // Simple validation
        if (!cardDetails.number || !cardDetails.name || !cardDetails.expiry || !cardDetails.cvv) {
            toast.error("Please fill all card details")
            return
        }
        
        // In a real application, you would process the payment here
        // For now, we'll just generate an OTP
        generateOTP()
    }

    const bookAppointment = async () => {
        if (!token) {
           toast.warn("Login to book appointment")
           return navigate('/login')
        }

        try {
            const date = docSlots[slotIndex][0].datetime

            let day = date.getDate()
            let month = date.getMonth()+1
            let year = date.getFullYear()

            const slotDate = day+"_"+month+"_"+year
            
            const {data} = await axios.post(backendUrl + '/api/user/book-appointment',{docId,slotDate,slotTime,paymentMethod},{headers:{token}})
            
            if (data.success) {
                toast.success(data.message)
                getDoctorsData()
                navigate('/my-appointments')
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }
    
    const resetBooking = () => {
        setShowOTP(false)
        setOtp('')
        setGeneratedOTP('')
        setShowCardForm(false)
        setCardDetails({
            number: '',
            name: '',
            expiry: '',
            cvv: ''
        })
    }

    useEffect(() => {
        fetchDocInfo()
    },[doctors,docId])

    useEffect(() => {
        getAvailableSlots()
    },[docInfo])

    useEffect(() => {
        console.log(docSlots)        
    },[docSlots])

  return docInfo && (
    <div>
        <div className='text-center text-xl font-medium text-gray-700 my-4'>
            The doctors near you are
        </div>
        
        <div className='flex flex-col sm:flex-row gap-4'>
            <div>
                <img className='bg-[#5f6FFF] w-full sm:max-w-72 rounded-lg' src={docInfo.image} alt="" />
            </div>

            <div className='flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0'>
                <p className='flex items-center gap-2 text-2xl font-medium text-gray-900'>{docInfo.name} <img className='w-5' src={assets.verified_icon} alt="" /></p>
                <div className='flex items-center gap-2 text-sm mt-1 text-gray-600'>
                    <p>{docInfo.degree} - {docInfo.speciality}</p>
                    <button className='py-0.5 px-2 border text-xs rounded-full'>{docInfo.experience}</button>
                </div>

                <div>
                    <p className='flex items-center gap-1 text-sm font-medium text-gray-900 mt-3'>About <img src={assets.info_icon} alt="" /></p>
                    <p className='text-sm text-gray-500 max-w-[700px] mt-1'>{docInfo.about}</p>
                </div>
                <p className='text-gray-500 font-medium mt-4'>
                    Appointment fee: <span className='text-gray-600'>{currencySymbol}{docInfo.fees}</span>
                </p>
            </div>
        </div>

        <div className='sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700'>
            <p>Booking slots</p>
            <div className='flex gap-3 items-center w-full overflow-x-scroll mt-4'>
                {
                    docSlots.length && docSlots.map((item,index) => (
                        <div onClick={()=>setSlotIndex(index)} className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${slotIndex === index ? 'bg-[#5f6FFF] text-white' : 'border border-gray-200'}`} key={index}>
                            <p>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
                            <p>{item[0] && item[0].datetime.getDate()}</p>
                        </div>
                    ))
                }
            </div>

            <div className='flex items-center gap-3 w-full overflow-x-scroll mt-4'>
                {docSlots.length && docSlots[slotIndex].map((item, index) => (
                    <p onClick={()=>setSlotTime(item.time)} key={index} className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${item.time === slotTime ? 'bg-[#5f6FFF] text-white' : 'text-gray-400 border border-gray-3000'}`}>
                        {item.time.toLowerCase()}
                    </p>
                ))}
            </div>
            
            {/* Payment Options */}
            {slotTime && !showCardForm && !showOTP && (
                <div className='mt-6'>
                    <p className='font-medium mb-3'>Select Payment Method</p>
                    <div className='flex gap-4 mb-4'>
                        <div 
                            onClick={() => setPaymentMethod('card')}
                            className={`flex items-center gap-2 border rounded-lg p-3 cursor-pointer ${paymentMethod === 'card' ? 'border-[#5f6FFF] bg-blue-50' : 'border-gray-300'}`}
                        >
                            <div className={`w-4 h-4 rounded-full border ${paymentMethod === 'card' ? 'bg-[#5f6FFF] border-[#5f6FFF]' : 'border-gray-400'}`}></div>
                            <span>Card Payment</span>
                        </div>
                        <div 
                            onClick={() => setPaymentMethod('cash')}
                            className={`flex items-center gap-2 border rounded-lg p-3 cursor-pointer ${paymentMethod === 'cash' ? 'border-[#5f6FFF] bg-blue-50' : 'border-gray-300'}`}
                        >
                            <div className={`w-4 h-4 rounded-full border ${paymentMethod === 'cash' ? 'bg-[#5f6FFF] border-[#5f6FFF]' : 'border-gray-400'}`}></div>
                            <span>Cash on Arrival</span>
                        </div>
                    </div>
                    
                    {/* Book Appointment Button */}
                    <button 
                        onClick={handlePaymentSelection}
                        className='bg-[#5f6FFF] text-white text-sm font-light px-14 py-3 rounded-full my-6'
                    >
                        {paymentMethod === 'card' ? 'Proceed to Payment' : 'Book with Cash on Arrival'}
                    </button>
                </div>
            )}
            
            {/* Card Payment Form */}
            {showCardForm && (
                <div className='mt-6 p-4 border rounded-lg bg-blue-50'>
                    <p className='font-medium mb-4'>Card Details</p>
                    <div className='space-y-4'>
                        <div>
                            <label className='block text-sm font-medium text-gray-700 mb-1'>Card Number</label>
                            <input 
                                type="text" 
                                value={cardDetails.number}
                                onChange={(e) => setCardDetails({...cardDetails, number: e.target.value})}
                                className='border border-gray-300 rounded-lg px-3 py-2 w-full'
                                placeholder='1234 5678 9012 3456'
                            />
                        </div>
                        <div>
                            <label className='block text-sm font-medium text-gray-700 mb-1'>Cardholder Name</label>
                            <input 
                                type="text" 
                                value={cardDetails.name}
                                onChange={(e) => setCardDetails({...cardDetails, name: e.target.value})}
                                className='border border-gray-300 rounded-lg px-3 py-2 w-full'
                                placeholder='John Doe'
                            />
                        </div>
                        <div className='flex gap-4'>
                            <div className='flex-1'>
                                <label className='block text-sm font-medium text-gray-700 mb-1'>Expiry Date</label>
                                <input 
                                    type="text" 
                                    value={cardDetails.expiry}
                                    onChange={(e) => setCardDetails({...cardDetails, expiry: e.target.value})}
                                    className='border border-gray-300 rounded-lg px-3 py-2 w-full'
                                    placeholder='MM/YY'
                                />
                            </div>
                            <div className='flex-1'>
                                <label className='block text-sm font-medium text-gray-700 mb-1'>CVV</label>
                                <input 
                                    type="password" 
                                    value={cardDetails.cvv}
                                    onChange={(e) => setCardDetails({...cardDetails, cvv: e.target.value})}
                                    className='border border-gray-300 rounded-lg px-3 py-2 w-full'
                                    placeholder='123'
                                />
                            </div>
                        </div>
                    </div>
                    <div className='flex gap-2 mt-6'>
                        <button 
                            onClick={handleCardPayment}
                            className='bg-[#5f6FFF] text-white px-4 py-2 rounded-lg flex-1'
                        >
                            Pay Now
                        </button>
                        <button 
                            onClick={() => setShowCardForm(false)}
                            className='border border-gray-400 text-gray-700 px-4 py-2 rounded-lg'
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}
            
            {/* OTP Verification */}
            {showOTP && (
                <div className='mt-6 p-4 border rounded-lg bg-blue-50'>
                    <p className='font-medium mb-2'>Enter OTP</p>
                    <p className='text-sm text-gray-600 mb-3'>An OTP has been sent to your registered mobile number</p>
                    <div className='flex gap-2'>
                        <input 
                            type="text" 
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            className='border border-gray-300 rounded-lg px-3 py-2 w-32'
                            placeholder='Enter OTP'
                        />
                        <button 
                            onClick={verifyOTP}
                            className='bg-[#5f6FFF] text-white px-4 py-2 rounded-lg'
                        >
                            Verify
                        </button>
                        <button 
                            onClick={generateOTP}
                            className='border border-[#5f6FFF] text-[#5f6FFF] px-4 py-2 rounded-lg'
                        >
                            Resend
                        </button>
                    </div>
                    <button 
                        onClick={() => setShowOTP(false)}
                        className='mt-3 text-sm text-gray-600 underline'
                    >
                        Cancel
                    </button>
                </div>
            )}
            
            {!slotTime && (
                <button className='bg-gray-300 text-white text-sm font-light px-14 py-3 rounded-full my-6 cursor-not-allowed'>
                    Select a time slot to book
                </button>
            )}
        </div>
        <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
    </div>
  )
}

export default Appointment