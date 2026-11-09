import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import Input from '../common/Input.jsx';
import Button from '../common/Button.jsx';
import { studentProfileSchema } from '../../utils/validators.js';
import { getErrorMessage } from '../../utils/helpers.js';
import * as profileService from '../../services/profile.service.js';

const StudentProfileForm = ({ defaultValues, onSaved, submitLabel = 'Save profile' }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(studentProfileSchema),
    defaultValues: {
      rollNumber: defaultValues?.rollNumber || '',
      department: defaultValues?.department || '',
      year: defaultValues?.year || '',
      section: defaultValues?.section || '',
      collegeName: defaultValues?.collegeName || '',
    },
  });

  useEffect(() => {
    if (defaultValues) {
      reset({
        rollNumber: defaultValues.rollNumber || '',
        department: defaultValues.department || '',
        year: defaultValues.year || '',
        section: defaultValues.section || '',
        collegeName: defaultValues.collegeName || '',
      });
    }
  }, [defaultValues, reset]);

  const onSubmit = async (data) => {
    try {
      const saved = await profileService.upsertMyProfile(data);
      toast.success('Profile saved');
      onSaved?.(saved);
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      <Input label="Roll number" placeholder="21CS045" error={errors.rollNumber?.message} {...register('rollNumber')} />
      <div className="grid grid-cols-2 gap-4">
        <Input label="Department" placeholder="Computer Science" error={errors.department?.message} {...register('department')} />
        <Input label="Year" placeholder="3rd Year" error={errors.year?.message} {...register('year')} />
      </div>
      <Input label="Section" placeholder="B" error={errors.section?.message} {...register('section')} />
      <Input label="College name" placeholder="State University" error={errors.collegeName?.message} {...register('collegeName')} />
      <Button type="submit" isLoading={isSubmitting} className="w-full">
        {submitLabel}
      </Button>
    </form>
  );
};

export default StudentProfileForm;
