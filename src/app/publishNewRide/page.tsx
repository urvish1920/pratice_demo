'use client'
import Form from './form';
import Image from 'next/image';
import logoImage from '../assert/logo.png';

export default function PublishNewRide() {

    return (
        <div>
            <Image src={logoImage} alt="Logo" width={100} height={50} className="logo-image" />
            <Form />

        </div >
    );
}
