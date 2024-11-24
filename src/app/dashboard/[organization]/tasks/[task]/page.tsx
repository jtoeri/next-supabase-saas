import React, { use } from 'react';
import { redirect } from 'next/navigation';

import ArrowLeftIcon from '@heroicons/react/24/outline/ArrowLeftIcon';

import Button from '~/core/ui/Button';
import getSupabaseServerClient from '~/core/supabase/server-component-client';
import { getTask } from '~/lib/tasks/queries';
import AppHeader from '~/app/dashboard/[organization]/components/AppHeader';
import TaskItemContainer from '~/app/dashboard/[organization]/tasks/components/TaskItemContainer';
import { withI18n } from '~/i18n/with-i18n';
import { PageBody } from '~/core/ui/Page';

interface Context {
  params: {
    task: string;
  };
}

export const metadata = {
  title: `Task`,
};

const TaskPage = ({ params }: Context) => {
  const data = use(loadTaskData(params.task));
  const task = data.task;

  return (
    <>
      <AppHeader title={`Tasks`}>
        <Button size={'small'} variant={'transparent'} href={'../tasks'}>
          <ArrowLeftIcon className={'mr-2 h-4'} />
          Back to Tasks
        </Button>
      </AppHeader>

      <PageBody>
        <TaskItemContainer task={task} />
      </PageBody>
    </>
  );
};

export async function loadTaskData(taskId: string) {
  const client = getSupabaseServerClient();
  const { data: task } = await getTask(client, Number(taskId));

  if (!task) {
    redirect('/dashboard');
  }

  return {
    task,
  };
}

export default withI18n(TaskPage);
