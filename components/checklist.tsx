import React, {useState} from 'react';
import ChecklistItem from './checklistitem';
import IChecklistProps from './interfaces/ichecklistprops';
import IChecklist from './interfaces/ichecklist';

function Checklist(props: IChecklistProps) {
    const [checklist, setChecklist] = useState('');
    const [addChecklist, setAddChecklist] = useState(false);

    const handleSubmitChecklist = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            if (checklist.trim().length > 0) {
                props.addChecklist(
                    props.currentColumn._id,
                    props.currentCard._id,
                    checklist
                );
            }
            setChecklist('');
        }
    };

    return (
        <div className="checklist-box">
            <div className="card-deatil-title">Checklist</div>
            <div>
                {props.currentCard &&
                props.currentCard.checklists.map((checklist: IChecklist) => {
                    return (
                        <div key={checklist._id}>
                            <ChecklistItem {...props} checklist={checklist}/>
                        </div>
                    );
                })}
                {props.currentCard.checklists.length === 0 && (
                    <div className="card-detail-note">This task has no checklists.</div>
                )}
            </div>
            {addChecklist && (
                <div>
                    <div className="display-flex checklist-row">
                        <div className="checklist-circle cursor-pointer">
                            <i className="far fa-circle"></i>
                        </div>
                        <input
                            autoFocus
                            value={checklist}
                            onBlur={(e: any) => {
                                if (e.target.value.trim().length === 0) setAddChecklist(false);
                            }}
                            onChange={(e) => setChecklist(e.target.value)}
                            onKeyDown={(e) => handleSubmitChecklist(e)}
                            className="checklist-content border-none"
                        ></input>
                    </div>
                </div>
            )}
            {!props.currentCard.isArchived && (
                <div
                    onClick={() => setAddChecklist(true)}
                    className="card-deatil-checklist text-skyblue cursor-pointer"
                >
                    + Add Checklist Item
                </div>
            )}
        </div>
    );
}

export default Checklist;
