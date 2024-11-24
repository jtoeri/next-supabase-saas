'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { createTask, deleteTask, updateTask } from '~/lib/tasks/mutations';
import type Task from '~/lib/tasks/types/task';
import { withSession } from '~/core/generic/actions-utils';
import getSupabaseServerActionClient from '~/core/supabase/action-client';
import { parseOrganizationIdCookie } from '~/lib/server/cookies/organization.cookie';
import requireSession from '~/lib/user/require-session';
import verifyCsrfToken from '~/core/verify-csrf-token';

type CreateTaskParams = {
  task: Omit<Task, 'id'>;
};

type UpdateTaskParams = {
  task: Partial<Task> & Pick<Task, 'id'>;
};

type DeleteTaskParams = {
  taskId: number;
};

export const createTaskAction = withSession(
  async (params: CreateTaskParams) => {
    const client = getSupabaseServerActionClient();
    const session = await requireSession(client);
    const uid = await parseOrganizationIdCookie(session.user.id);
    const path = `/dashboard/${uid}/tasks`;

    await createTask(client, params.task);

    // revalidate the tasks page
    revalidatePath(path, 'page');

    // redirect to the tasks page
    redirect(path);
  },
);

export const updateTaskAction = withSession(
  async (params: UpdateTaskParams) => {
    const client = getSupabaseServerActionClient();

    await updateTask(client, params.task);

    const path = `/dashboard/[organization]/tasks`;

    // revalidate the tasks page and the task page
    revalidatePath(path, 'page');
    revalidatePath(`${path}/[task]`, 'page');
  },
);

export const deleteTaskAction = withSession(
  async (params: DeleteTaskParams) => {
    const client = getSupabaseServerActionClient();
    const session = await requireSession(client);
    const uid = await parseOrganizationIdCookie(session.user.id);
    const path = `/dashboard/${uid}/tasks`;

    await deleteTask(client, params.taskId);

    revalidatePath(path, 'page');
  },
);
