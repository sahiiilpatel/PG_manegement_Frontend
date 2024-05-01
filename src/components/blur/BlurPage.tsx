import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '../ui/card';
import { BellRing, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import Heading from '../shared/heading';
import { useGetSubscriptionList } from '@/pages/room/queries/queries';
import { checkout } from '@/api/subscription/subscription';
import Razorpay from 'razorpay';

export const BlurPage = (props: any) => {
  const { data, isLoading } = useGetSubscriptionList();

  console.log(data, 'data11111');

  const notifications = [
    {
      title: 'Your call has been confirmed.',
      description: '1 hour ago'
    },
    {
      title: 'You have a new message!',
      description: '1 hour ago'
    },
    {
      title: 'Your subscription is expiring soon!',
      description: '2 hours ago'
    }
  ];

  const handlePayment = async () => {
    try {
      const data = {
        amount: 50,
        name: 'sahil',
        planId: '66211341eb314d3ded69090f'
      };
      const response: any = await checkout(data);

      var options: any = {
        key: 'rzp_test_nTdQGQc9GojJI8',
        amount: response.data.amount,
        currency: response.data.currency,
        name: 'Sahil',
        description: 'Buy Subscription',
        image:
          'http://res.cloudinary.com/dq5pk04qi/image/upload/v1713447874/ktoczgxxhpuncrm3udct.jpg',
        order_id: response.data?.id,
        callback_url: 'http://localhost:8000/api/v1/payment/verification',
        prefill: {
          name: 'Sahil Patel',
          email: 'sahil.patel@example.com',
          contact: '7990854444'
        },
        notes: {
          address: 'subscription'
        },
        theme: {
          color: '#3399cc'
        }
      };
      var rzp1 = window.Razorpay(options);
      rzp1.open();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Heading
        title={'Please Subscribe Plane To Access This Page'}
        className="space-y-2 py-4 text-center"
      />
      {isLoading ? (
        <p>loading...</p>
      ) : (
        <div className="flex items-center justify-center gap-4 py-5">
          {data?.data?.map((res: any, index: number) => {
            return (
              <Card className={cn('w-[380px]')} {...props}>
                <CardHeader>
                  <CardTitle>{res?.duration}</CardTitle>
                  <CardDescription>You have 3 unread messages.</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                  <div>
                    <div
                      key={index}
                      className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
                    >
                      <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">
                          occupants : {res.limits?.occupants}
                        </p>
                        <p className="text-sm font-medium leading-none">
                          pgs : {res.limits?.pgs}
                        </p>
                        {res?.features?.map((feat: any, index: number) => {
                          <p className="text-sm font-medium leading-none">
                            {res}
                          </p>;
                        })}
                        <p className="text-md py-4 font-medium">
                          {res?.price} ruppees
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" onClick={handlePayment}>
                    <Check className="mr-2 h-4 w-4" /> Mark all as read
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};
