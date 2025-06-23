import { useMutation } from '@tanstack/react-query';
import contactService from '../api/contactService';
import { toast } from 'react-hot-toast';

/**
 * Hook to submit contact form
 */
export const useSubmitContactForm = () => {
  return useMutation({
    mutationFn: (formData) => contactService.submitContactForm(formData),
    onSuccess: () => {
      toast.success("Thank you for your message. We'll respond shortly!");
    },
    onError: (error) => {
      if (error.response?.data?.errors) {
        const validationErrors = error.response.data.errors;
        Object.values(validationErrors).forEach(errorMessages => {
          errorMessages.forEach(message => toast.error(message));
        });
      } else {
        toast.error("Failed to send message. Please try again later.");
      }
    }
  });
};
