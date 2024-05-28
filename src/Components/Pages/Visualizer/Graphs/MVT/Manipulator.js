import { ReplicaButton } from "../../../../Shared/Buttons";
import { FontVarTitle } from "../../../../Shared/Title";

const MVT_GRAPH_LABELS = ['Replica 1', 'Replica 2', 'Replica 3', 'Replica 4']

const Manipulator = ({
    labelToggleFaulty,
    labelToggle,
    toggleFaulty,
    toggleLine,
}) => {
    return (
        <div className='mt-2 rounded-md w-550p py-6 px-2 border-3p border-solid border-gray-700 dark:border-gray-50 flex flex-col gap-y-6 bg-blue-10 dark:bg-blue-450'>
            <div className="flex flex-col gap-y-6">
                <FontVarTitle title={'Select Replica To be Faulty:'} fontClass={'text-15p'} />
                <div className='flex gap-x-7 justify-center'>
                    {MVT_GRAPH_LABELS.length > 0 && MVT_GRAPH_LABELS.map((title, index) => (
                        <ReplicaButton
                            title={title}
                            onClick={() => toggleFaulty(title)}
                            faulty={labelToggleFaulty[title]}
                            key={index}
                        />
                    ))}
                </div>
            </div>
            <div className="flex flex-col gap-y-6">
                <FontVarTitle title={'Toggle Line Graph:'} fontClass={'text-15p'} />
                <div className='flex gap-x-7 justify-center'>
                    {MVT_GRAPH_LABELS.length > 0 && MVT_GRAPH_LABELS.map((title, index) => (
                        <ReplicaButton
                            title={title}
                            onClick={() => toggleLine(title)}
                            lineActive={labelToggle[title]}
                            lineToggle={true}
                            key={index}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Manipulator
