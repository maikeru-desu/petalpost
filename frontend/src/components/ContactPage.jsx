import React, { useState } from "react";
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaClock, FaLeaf } from "react-icons/fa";
import toast from "react-hot-toast";
import { useSubmitContactForm } from "../hooks/useContact";

const ContactPage = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: ""
    });
    
    const submitContactForm = useSubmitContactForm();
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        
        submitContactForm.mutate(formData, {
            onSuccess: () => {
                setFormData({
                    name: "",
                    email: "",
                    subject: "",
                    message: ""
                });
            }
        });
    };
    
    return (
        <div className="bg-sage/5">
            {/* Hero Banner */}
            <div className="relative overflow-hidden bg-gradient-to-br from-flax/20 to-sage/30">
                {/* Decorative elements */}
                <div className="absolute top-0 left-0 w-64 h-64 bg-redwood/5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-wine/5 rounded-full translate-x-1/3 translate-y-1/3"></div>
                
                <div className="container mx-auto px-4 py-20 relative">
                    <h1 className="text-4xl md:text-5xl font-serif text-caput-mortuum text-center mb-4">
                        Get in Touch
                    </h1>
                    <div className="w-24 h-1 bg-flax mx-auto mb-8"></div>
                    <p className="text-wine text-center max-w-xl mx-auto text-lg">
                        We'd love to hear from you. Whether you have a question about our arrangements, delivery, or special occasions, our team is ready to assist.
                    </p>
                </div>
            </div>
            
            {/* Main Content */}
            <div className="container mx-auto px-4 pb-16">
                <div className="max-w-5xl mx-auto">
                    {/* Contact sections */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-16">
                        {/* Contact info card */}
                        <div className="rounded-lg bg-white shadow-sm border border-flax/10 overflow-hidden transform transition-transform hover:shadow-md">
                            <div className="h-2 bg-gradient-to-r from-redwood to-wine"></div>
                            <div className="p-6">
                                <div className="w-12 h-12 bg-flax/10 rounded-full flex items-center justify-center mb-6">
                                    <FaEnvelope className="text-redwood text-xl" />
                                </div>
                                <h3 className="text-xl font-serif text-caput-mortuum mb-3">Email Us</h3>
                                <p className="text-wine/80">
                                    <a href="mailto:hello@petalpost.com" className="hover:text-redwood transition-colors">
                                        hello@petalpost.com
                                    </a>
                                </p>
                                <p className="text-wine/80 mt-2">
                                    <a href="mailto:orders@petalpost.com" className="hover:text-redwood transition-colors">
                                        orders@petalpost.com
                                    </a>
                                </p>
                            </div>
                        </div>
                        
                        {/* Visit us card */}
                        <div className="rounded-lg bg-white shadow-sm border border-flax/10 overflow-hidden transform transition-transform hover:shadow-md">
                            <div className="h-2 bg-gradient-to-r from-flax to-sage"></div>
                            <div className="p-6">
                                <div className="w-12 h-12 bg-flax/10 rounded-full flex items-center justify-center mb-6">
                                    <FaMapMarkerAlt className="text-redwood text-xl" />
                                </div>
                                <h3 className="text-xl font-serif text-caput-mortuum mb-3">Visit Our Store</h3>
                                <p className="text-wine/80">
                                    123 Blossom Street<br />
                                    Flowertown, FL 12345
                                </p>
                                <p className="text-sm text-wine/60 mt-4">
                                    <FaClock className="inline mr-2" />
                                    Mon-Fri: 9AM-7PM<br />
                                    <span className="ml-5">Sat: 10AM-6PM</span><br />
                                    <span className="ml-5">Sun: 12PM-5PM</span>
                                </p>
                            </div>
                        </div>
                        
                        {/* Call us card */}
                        <div className="rounded-lg bg-white shadow-sm border border-flax/10 overflow-hidden transform transition-transform hover:shadow-md">
                            <div className="h-2 bg-gradient-to-r from-caput-mortuum to-redwood"></div>
                            <div className="p-6">
                                <div className="w-12 h-12 bg-flax/10 rounded-full flex items-center justify-center mb-6">
                                    <FaPhone className="text-redwood text-xl" />
                                </div>
                                <h3 className="text-xl font-serif text-caput-mortuum mb-3">Call Us</h3>
                                <p className="text-wine/80">
                                    <a href="tel:+15551234567" className="hover:text-redwood transition-colors">
                                        (555) 123-4567
                                    </a>
                                </p>
                                <p className="text-sm text-wine/60 mt-4">
                                    Available during store hours for immediate assistance with your floral needs.
                                </p>
                            </div>
                        </div>
                    </div>
                    
                    {/* Form and Map Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 mb-16">
                        {/* Contact Form */}
                        <div className="lg:col-span-3 bg-white p-8 rounded-lg shadow-sm border border-flax/10">
                            <h2 className="text-2xl font-serif text-caput-mortuum relative inline-block mb-8">
                                Send a Message
                                <div className="absolute -bottom-2 left-0 w-full h-1 bg-flax"></div>
                            </h2>
                            
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-wine mb-1">
                                            Your Name
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 border border-sage/30 rounded-md focus:outline-none focus:ring-2 focus:ring-flax/50 focus:border-flax bg-sage/5"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-wine mb-1">
                                            Email Address
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 border border-sage/30 rounded-md focus:outline-none focus:ring-2 focus:ring-flax/50 focus:border-flax bg-sage/5"
                                            required
                                        />
                                    </div>
                                </div>
                                
                                <div>
                                    <label htmlFor="subject" className="block text-sm font-medium text-wine mb-1">
                                        Subject
                                    </label>
                                    <input
                                        type="text"
                                        id="subject"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border border-sage/30 rounded-md focus:outline-none focus:ring-2 focus:ring-flax/50 focus:border-flax bg-sage/5"
                                        required
                                    />
                                </div>
                                
                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-wine mb-1">
                                        Your Message
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        rows="5"
                                        value={formData.message}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border border-sage/30 rounded-md focus:outline-none focus:ring-2 focus:ring-flax/50 focus:border-flax bg-sage/5"
                                        required
                                    ></textarea>
                                </div>
                                
                                <button
                                    type="submit"
                                    disabled={submitContactForm.isPending}
                                    className="px-6 py-3 bg-redwood text-white rounded-md shadow-sm hover:shadow-md hover:bg-wine transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-redwood flex items-center justify-center"
                                >
                                    {submitContactForm.isPending ? (
                                        <>
                                            <svg className="animate-spin mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Sending...
                                        </>
                                    ) : (
                                        <>Send Message</>
                                    )}
                                </button>
                            </form>
                        </div>
                        
                        {/* Map Section */}
                        <div className="lg:col-span-2 bg-white p-8 rounded-lg shadow-sm border border-flax/10">
                            <h2 className="text-2xl font-serif text-caput-mortuum relative inline-block mb-8">
                                Our Location
                                <div className="absolute -bottom-2 left-0 w-full h-1 bg-flax"></div>
                            </h2>
                            
                            <div className="w-full rounded-md overflow-hidden shadow-sm" style={{ height: "350px", position: "relative" }}>
                                {/* Google Maps Integration */}
                                <iframe 
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7055.938036788059!2d11.993609533996871!3d57.70337014833246!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x464ff3cf76465727%3A0x7c9f7362e50f892f!2sJacy%27z%20Flower%20Shop!5e1!3m2!1sen!2sph!4v1750579058823!5m2!1sen!2sph" 
                                    style={{ 
                                        position: "absolute", 
                                        top: 0, 
                                        left: 0, 
                                        width: "100%", 
                                        height: "100%", 
                                        border: "none" 
                                    }}
                                    allowFullScreen="" 
                                    loading="lazy" 
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title="PetalPost Store Location"
                                    aria-hidden="false"
                                ></iframe>
                            </div>
                            
                            <div className="mt-4 flex justify-center">
                                <a 
                                    href="https://maps.google.com" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center text-wine hover:text-redwood transition-colors"
                                >
                                    <span>Get Directions</span>
                                    <svg className="ml-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                    
                    {/* FAQ Section */}
                    <div className="bg-white p-8 rounded-lg shadow-sm border border-flax/10 mb-16">
                        <h2 className="text-2xl font-serif text-caput-mortuum relative inline-block mb-8">
                            Frequently Asked Questions
                            <div className="absolute -bottom-2 left-0 w-full h-1 bg-flax"></div>
                        </h2>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* FAQ Item */}
                            <div className="border-l-2 border-flax pl-4">
                                <h3 className="text-lg font-medium text-wine mb-2">Do you offer same-day delivery?</h3>
                                <p className="text-caput-mortuum/70">
                                    Yes! Orders placed before 1:00 PM local time can be delivered the same day, subject to availability and delivery area.
                                </p>
                            </div>
                            
                            {/* FAQ Item */}
                            <div className="border-l-2 border-redwood pl-4">
                                <h3 className="text-lg font-medium text-wine mb-2">How do I care for my flowers?</h3>
                                <p className="text-caput-mortuum/70">
                                    Keep your flowers in fresh water, trim the stems every few days, and place them away from direct sunlight and heat sources.
                                </p>
                            </div>
                            
                            {/* FAQ Item */}
                            <div className="border-l-2 border-sage pl-4">
                                <h3 className="text-lg font-medium text-wine mb-2">Can I customize my arrangement?</h3>
                                <p className="text-caput-mortuum/70">
                                    Absolutely! We're happy to create custom arrangements. Contact us to discuss your specific requirements.
                                </p>
                            </div>
                            
                            {/* FAQ Item */}
                            <div className="border-l-2 border-wine pl-4">
                                <h3 className="text-lg font-medium text-wine mb-2">Do you provide wedding flowers?</h3>
                                <p className="text-caput-mortuum/70">
                                    Yes, we specialize in wedding florals! We offer consultations to discuss your vision, color palette, and budget.
                                </p>
                            </div>
                        </div>
                    </div>
                    
                    {/* Newsletter Section */}
                    <div className="bg-gradient-to-r from-flax/20 to-sage/20 p-8 rounded-lg shadow-sm">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                            <div>
                                <h2 className="text-2xl font-serif text-caput-mortuum mb-3">Stay Connected</h2>
                                <p className="text-wine">
                                    Subscribe to our newsletter for seasonal updates, special offers, and floral inspiration.
                                </p>
                            </div>
                            <div>
                                <div className="flex">
                                    <input 
                                        type="email" 
                                        placeholder="Your email address" 
                                        className="flex-1 px-4 py-3 rounded-l-md border-y border-l border-sage/30 focus:outline-none focus:ring-2 focus:ring-flax/50 bg-white"
                                    />
                                    <button className="bg-redwood text-white px-6 py-3 rounded-r-md hover:bg-wine transition-colors">
                                        Subscribe
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Decorative Divider */}
            <div className="py-8 relative overflow-hidden">
                <div className="flex justify-center items-center">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="text-redwood opacity-70">
                        <path d="M12,0 C14,4 16,6 20,6 C16,6 14,8 12,12 C10,8 8,6 4,6 C8,6 10,4 12,0 Z" fill="currentColor" />
                    </svg>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;
