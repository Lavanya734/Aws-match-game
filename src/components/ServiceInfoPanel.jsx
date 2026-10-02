function ServiceInfoPanel({ service }) {
  if (!service) {
    return (
      <aside className="service-panel service-panel-empty">
        <span className="panel-label">AWS SERVICE</span>

        <div className="panel-placeholder">
          <span className="panel-placeholder-icon">?</span>

          <h3>Match a card pair</h3>

          <p>
            Successfully match two cards to discover more about
            the AWS service.
          </p>
        </div>
      </aside>
    );
  }

  return (
    <aside className="service-panel">
      <div className="panel-top">
        <span className="panel-label">AWS SERVICE</span>

        <span className="service-tag">
          {service.category || "AWS"}
        </span>
      </div>

      {service.icon && (
        <img
          src={service.icon}
          alt=""
          className="panel-service-icon"
        />
      )}

      <h2>{service.name}</h2>

      <div className="service-detail">
        <span>WHAT</span>
        <p>{service.what}</p>
      </div>

      <div className="service-detail">
        <span>WHY USE IT</span>
        <p>{service.why}</p>
      </div>

      <div className="service-detail">
        <span>WHERE</span>
        <p>{service.where}</p>
      </div>
    </aside>
  );
}

export default ServiceInfoPanel;