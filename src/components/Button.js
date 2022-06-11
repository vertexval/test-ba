function Button(props) {
  return (
    <button className={props.class} onClick={props.onClick} options={props.options}>
      {props.label}{props.children}
    </button>
  );
}

export default Button;
