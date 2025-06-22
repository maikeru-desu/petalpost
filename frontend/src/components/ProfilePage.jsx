import React, { useState, useEffect } from "react";
import { useProfile, useUpdateProfile } from "../hooks/useProfile";
import LoadingScreen from "./common/LoadingScreen";
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";

const ProfilePage = () => {
    const { data: profileData, isLoading, error } = useProfile();
    const updateProfileMutation = useUpdateProfile();
    
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        address: ""
    });
    
    useEffect(() => {
        if (profileData) {
            setFormData({
                first_name: profileData.first_name || "",
                last_name: profileData.last_name || "",
                email: profileData.email || "",
                phone: profileData.phone || "",
                address: profileData.address || ""
            });
        }
    }, [profileData]);
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        updateProfileMutation.mutate(formData);
    };
    
    if (isLoading) return <LoadingScreen />;
    
    if (error) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="bg-red-50 p-4 rounded-md text-red-800">
                    <p>Failed to load your profile. Please try again later.</p>
                </div>
            </div>
        );
    }
    
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-2xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">My Profile</h1>
                
                <div className="bg-white shadow rounded-lg p-6 mb-8">
                    <form onSubmit={handleSubmit}>
                        <div className="space-y-6">
                            {/* Name fields */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="first_name" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                                        <FaUser className="mr-2 text-redwood" /> First Name
                                    </label>
                                    <input
                                        type="text"
                                        id="first_name"
                                        name="first_name"
                                        value={formData.first_name}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sage focus:border-sage"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="last_name" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                                        Last Name
                                    </label>
                                    <input
                                        type="text"
                                        id="last_name"
                                        name="last_name"
                                        value={formData.last_name}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sage focus:border-sage"
                                        required
                                    />
                                </div>
                            </div>
                            
                            {/* Email field */}
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                                    <FaEnvelope className="mr-2 text-redwood" /> Email Address
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sage focus:border-sage"
                                    required
                                    disabled
                                />
                                <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
                            </div>
                            
                            {/* Phone field */}
                            <div>
                                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                                    <FaPhone className="mr-2 text-redwood" /> Phone Number
                                </label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sage focus:border-sage"
                                />
                            </div>
                            
                            {/* Address field */}
                            <div>
                                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                                    <FaMapMarkerAlt className="mr-2 text-redwood" /> Shipping Address
                                </label>
                                <textarea
                                    id="address"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    rows="3"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sage focus:border-sage"
                                ></textarea>
                            </div>
                            
                            <div className="pt-4">
                                <button
                                    type="submit"
                                    className="w-full bg-redwood text-white py-3 px-4 rounded-md hover:bg-opacity-90 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-redwood flex justify-center items-center"
                                    disabled={updateProfileMutation.isPending}
                                >
                                    {updateProfileMutation.isPending ? (
                                        <>
                                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Saving Changes...
                                        </>
                                    ) : "Save Changes"}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
                
                <div className="bg-flax bg-opacity-10 p-6 rounded-lg border border-flax border-opacity-20">
                    <h3 className="text-lg font-semibold text-caput-mortuum mb-2">Account Security</h3>
                    <p className="text-wine mb-4">If you would like to change your password, use the button below.</p>
                    <button 
                        className="bg-white border border-redwood text-redwood px-4 py-2 rounded-md hover:bg-redwood hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-redwood"
                        onClick={() => window.location.href = '/change-password'}
                    >
                        Change Password
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;