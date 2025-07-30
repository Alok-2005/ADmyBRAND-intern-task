'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { UserCircleIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import toast from 'react-hot-toast';
import { cn } from '@/lib/utils';

export function Profile() {
  const [userProfile, setUserProfile] = useState({
    username: 'JohnDoe',
    fullName: 'John Doe',
    email: 'john@example.com',
    phone: '+1-555-123-4567',
    profilePicture: '',
    receiveEmailNotifications: true,
    receiveSMSNotifications: false,
  });
  const [tempProfile, setTempProfile] = useState(userProfile);
  const [profilePictureFile, setProfilePictureFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!tempProfile.username) newErrors.username = 'Username is required';
    if (!tempProfile.fullName) newErrors.fullName = 'Full name is required';
    if (!tempProfile.email || !/\S+@\S+\.\S+/.test(tempProfile.email)) {
      newErrors.email = 'Valid email is required';
    }
    if (tempProfile.phone && !/^\+?[\d\s-]{10,}$/.test(tempProfile.phone)) {
      newErrors.phone = 'Valid phone number is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleProfileUpdate = () => {
    if (!validateForm()) return;
    setIsSubmitting(true);
    setTimeout(() => {
      if (profilePictureFile) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setUserProfile({ ...tempProfile, profilePicture: e.target?.result as string });
        };
        reader.readAsDataURL(profilePictureFile);
      } else {
        setUserProfile(tempProfile);
      }
      setIsSubmitting(false);
      toast.success('Profile updated successfully!', {
        position: 'top-right',
        duration: 3000,
        icon: <CheckCircleIcon className="w-5 h-5" />,
      });
    }, 1000);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.size > 2 * 1024 * 1024) {
      toast.error('Profile picture must be less than 2MB', { position: 'top-right' });
      return;
    }
    setProfilePictureFile(file || null);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6 rounded-2xl border bg-card/50 backdrop-blur-sm shadow-lg max-w-lg mx-auto"
    >
      <div className="flex items-center gap-2 mb-6">
        <UserCircleIcon className="w-6 h-6 text-primary" />
        <h3 className="text-2xl font-semibold">Profile Settings</h3>
      </div>

      <div className="space-y-6">
        {/* Profile Picture */}
        <div>
          <Label className="text-sm font-medium">Profile Picture</Label>
          <div className="flex items-center gap-4 mt-1">
            <div className="w-20 h-20 rounded-full overflow-hidden bg-muted">
              {tempProfile.profilePicture ? (
                <img
                  src={tempProfile.profilePicture}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <UserCircleIcon className="w-full h-full text-muted-foreground" />
              )}
            </div>
            <Input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="mt-1"
            />
          </div>
        </div>

        {/* Username */}
        <div>
          <Label className="text-sm font-medium">Username</Label>
          <Input
            value={tempProfile.username}
            onChange={(e) =>
              setTempProfile({ ...tempProfile, username: e.target.value })
            }
            className={cn('mt-1', errors.username && 'border-red-500')}
          />
          {errors.username && (
            <p className="text-xs text-red-500 mt-1">{errors.username}</p>
          )}
        </div>

        {/* Full Name */}
        <div>
          <Label className="text-sm font-medium">Full Name</Label>
          <Input
            value={tempProfile.fullName}
            onChange={(e) =>
              setTempProfile({ ...tempProfile, fullName: e.target.value })
            }
            className={cn('mt-1', errors.fullName && 'border-red-500')}
          />
          {errors.fullName && (
            <p className="text-xs text-red-500 mt-1">{errors.fullName}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <Label className="text-sm font-medium">Email</Label>
          <Input
            type="email"
            value={tempProfile.email}
            onChange={(e) =>
              setTempProfile({ ...tempProfile, email: e.target.value })
            }
            className={cn('mt-1', errors.email && 'border-red-500')}
          />
          {errors.email && (
            <p className="text-xs text-red-500 mt-1">{errors.email}</p>
          )}
        </div>

        {/* Phone Number */}
        <div>
          <Label className="text-sm font-medium">Phone Number</Label>
          <Input
            type="tel"
            value={tempProfile.phone}
            onChange={(e) =>
              setTempProfile({ ...tempProfile, phone: e.target.value })
            }
            className={cn('mt-1', errors.phone && 'border-red-500')}
          />
          {errors.phone && (
            <p className="text-xs text-red-500 mt-1">{errors.phone}</p>
          )}
        </div>

        {/* Notification Preferences */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium">Notification Preferences</h4>
          <div className="flex items-center justify-between">
            <Label className="text-sm">Email Notifications</Label>
            <Switch
              checked={tempProfile.receiveEmailNotifications}
              onCheckedChange={(checked) =>
                setTempProfile({ ...tempProfile, receiveEmailNotifications: checked })
              }
            />
          </div>
          <div className="flex items-center justify-between">
            <Label className="text-sm">SMS Notifications</Label>
            <Switch
              checked={tempProfile.receiveSMSNotifications}
              onCheckedChange={(checked) =>
                setTempProfile({ ...tempProfile, receiveSMSNotifications: checked })
              }
            />
          </div>
        </div>

        {/* Action Buttons */}
        <motion.div
          className="flex gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Button
            onClick={handleProfileUpdate}
            className="flex-1"
            disabled={isSubmitting || Object.keys(errors).length > 0}
          >
            {isSubmitting ? 'Saving...' : 'Save'}
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              setTempProfile(userProfile);
              setErrors({});
            }}
            className="flex-1"
          >
            Cancel
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
}