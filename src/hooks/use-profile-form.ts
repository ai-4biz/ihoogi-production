
import { useState, useEffect } from 'react';

// Define the profile data structure
export interface ProfileData {
  // General info
  phone: string;
  whatsapp: string;
  email: string;
  mainCategory: string;
  subCategory: string;
  mainService: string;
  
  // Advanced questions
  uniqueness: string;
  targetAudience: string[];
  coreValue: string;
  communicationTone: string;
  callToAction: string;
  tagline: string;
  
  // Social links
  socialLinks: {
    facebook: string;
    instagram: string;
    linkedin: string;
    tiktok: string;
    youtube: string;
  };
  website: string;
  infoSources: string[];
  
  // Content preferences
  contentLanguage: string;
  distributionLanguage: string;
  autoDistributionNetworks: string[];
  
  // Personal questions
  favoriteQuote: string;
  businessOffer: string;
  interests: string[];
  
  // Files are handled separately since they're not easily serializable
}

export const useProfileForm = () => {
  const [profileData, setProfileData] = useState<ProfileData>(() => {
    // Try to load from localStorage
    const savedData = localStorage.getItem('profileData');
    if (savedData) {
      try {
        return JSON.parse(savedData) as ProfileData;
      } catch (e) {
        console.error('Failed to parse saved profile data', e);
      }
    }
    
    // Default values
    return {
      // General info
      phone: '',
      whatsapp: '',
      email: '',
      mainCategory: '',
      subCategory: '',
      mainService: '',
      
      // Advanced questions
      uniqueness: '',
      targetAudience: [],
      coreValue: '',
      communicationTone: 'professional',
      callToAction: '',
      tagline: '',
      
      // Social links
      socialLinks: {
        facebook: '',
        instagram: '',
        linkedin: '',
        tiktok: '',
        youtube: '',
      },
      website: '',
      infoSources: [],
      
      // Content preferences
      contentLanguage: 'he',
      distributionLanguage: 'he',
      autoDistributionNetworks: ['facebook'],
      
      // Personal questions
      favoriteQuote: '',
      businessOffer: '',
      interests: [],
    };
  });
  
  // Calculate completeness for progress bar
  const calculateCompleteness = () => {
    // Required fields to check
    const requiredFields = [
      profileData.phone, 
      profileData.email,
      profileData.mainCategory,
      profileData.subCategory,
      profileData.mainService,
      profileData.whatsapp,
      profileData.website,
      profileData.socialLinks.facebook || profileData.socialLinks.instagram || profileData.socialLinks.linkedin
    ];
    
    return requiredFields.filter(Boolean).length;
  };
  
  // Save to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem('profileData', JSON.stringify(profileData));
  }, [profileData]);
  
  // Update a specific section of profile data
  const updateSection = (section: keyof ProfileData, data: any) => {
    setProfileData(prev => ({
      ...prev,
      [section]: data
    }));
  };
  
  // Update a nested field
  const updateField = (path: string, value: any) => {
    const keys = path.split('.');
    setProfileData(prev => {
      let newData = { ...prev };
      let current: any = newData;
      
      // Navigate to the nested object
      for (let i = 0; i < keys.length - 1; i++) {
        const key = keys[i];
        current[key] = { ...current[key] };
        current = current[key];
      }
      
      // Set the value
      current[keys[keys.length - 1]] = value;
      return newData;
    });
  };
  
  return {
    profileData,
    updateSection,
    updateField,
    setProfileData,
    completedFields: calculateCompleteness(),
    totalRequiredFields: 8 // Total number of required fields
  };
};
