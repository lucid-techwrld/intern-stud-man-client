import { CalendarRange, Cake, BookOpen, Mail, Pencil, Phone, Trash2 } from 'lucide-react';
import { IStudent } from '../types';
import { fmtDate } from '../utils';
import { Avatar, Modal, StatusBadge } from './ui';

interface Props { student: IStudent | null; onClose: () => void; onEdit: (s: IStudent) => void; onDelete: (s: IStudent) => void }

export function StudentDrawer({ student, onClose, onEdit, onDelete }: Props) {
  return (
    <Modal open={!!student} onClose={onClose} title="Student profile" sheet>
      {student && (
        <>
          <div className="idc">
            <Avatar id={student.id} first={student.first_name} last={student.last_name} large />
            <small>{student.student_code}</small>
            <h2>{student.first_name} {student.last_name}</h2>
            <StatusBadge status={student.status} />
          </div>
          <div className="kv">
            <div><Mail size={19} /><span><small>Email</small>{student.email}</span></div>
            <div><Phone size={19} /><span><small>Phone</small>{student.phone || 'Not provided'}</span></div>
            <div><Cake size={19} /><span><small>Date of birth</small>{fmtDate(student.dob)}</span></div>
            <div><BookOpen size={19} /><span><small>Course</small>{student.course}</span></div>
            <div><CalendarRange size={19} /><span><small>Year of study</small>Year {student.year}</span></div>
          </div>
          <div className="sheet-act">
            <button className="btn ghost" onClick={() => onEdit(student)}><Pencil size={17} />Edit</button>
            <button className="btn danger" onClick={() => onDelete(student)}><Trash2 size={17} />Delete</button>
          </div>
        </>
      )}
    </Modal>
  );
}
