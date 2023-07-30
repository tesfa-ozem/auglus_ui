const KanbanCard = (props: { [key: string]: string }) => {
  console.log(props);
  return (
    <div className='card-template'>
      <div className="e-card-header">
        <div className="e-card-header-caption">
          <div className="e-card-header-title e-tooltip-text">
            {props.title}
          </div>
        </div>
      </div>
      <div className="e-card-content e-tooltip-text">
        <div className="e-text">Sample Task details</div>
      </div>
      
    </div>
  );
};

export default KanbanCard;
