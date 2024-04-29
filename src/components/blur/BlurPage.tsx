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
import { Switch } from '../ui/switch';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import Heading from '../shared/heading';

export const BlurPage = (props: any) => {
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

  return (
    <div>
      <Heading
        title={'Please Subscribe Plane To Access This Page'}
        className="space-y-2 py-4 text-center"
      />
      <div className="flex items-center justify-center gap-4 py-5">
        {notifications?.map((res: any) => {
          return (
            <Card className={cn('w-[380px]')} {...props}>
              <CardHeader>
                <CardTitle>Plans</CardTitle>
                <CardDescription>You have 3 unread messages.</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div>
                  {notifications.map((notification, index) => (
                    <div
                      key={index}
                      className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
                    >
                      <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {notification.title}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {notification.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">
                  <Check className="mr-2 h-4 w-4" /> Mark all as read
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
