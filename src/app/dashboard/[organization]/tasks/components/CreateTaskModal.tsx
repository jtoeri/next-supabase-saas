'use client';

import { useState } from 'react';
import { PlusCircleIcon } from '@heroicons/react/24/outline';

import Modal from '~/core/ui/Modal';
import Button from '~/core/ui/Button';

import TaskForm from './TaskForm';

function CreateTaskModal() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button variant={'ghost'} onClick={() => setIsOpen(true)}>
        <span className={'flex space-x-2 items-center'}>
          <PlusCircleIcon className={'w-4'} />

          <span>New Task</span>
        </span>
      </Button>

      <Modal heading={`Create Task`} isOpen={isOpen} setIsOpen={setIsOpen}>
        <TaskForm onCreate={() => setIsOpen(false)} />
      </Modal>
    </>
  );
}

export default CreateTaskModal;
