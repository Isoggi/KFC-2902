/** @format */

import React from 'react';
import ProfileComponent from '../components/profile.component';
import { auth } from '@/auth';

type Props = {};

export default async function page({}: Props) {
  return (
    <div className="px-[50px] py-[60px] lg:max-w-[520px] w-full m-auto">
      <b className="text-[32px] mt-5">MY PROFILE</b>
      <ProfileComponent />
    </div>
  );
}
