import React from 'react'

function Form({formControls, onSubmit, formData, setFormData, buttonNext}) {

  const types = {
    INPUT: "input",
    RADIO: "radiobutton",
    TEXTAREA: "textarea"
  }

  function getControllerItem(controllerItem){
        let element = undefined
        const value =  formData[controllerItem.name] || "" 

        switch(controllerItem.componentType){
             case types.INPUT:
                        element = (
                          <input type={controllerItem.type}
                          name={controllerItem.name}
                          placeholder={controllerItem.placeholder}
                          id={controllerItem.name}
                          value={value}
                          onChange={(event) => setFormData({...formData,[controllerItem.name] :event.target.value})} />
                        )
                        break;
              case types.RADIO:
                        element = <div>
                           {
                             controllerItem.options && controllerItem.options.length > 0 ? controllerItem.options.map((ele, idx) => <div key={idx}>
                                      <input
                                        id={idx}
                                        name={controllerItem.name}
                                        type={controllerItem.type}
                                        value={ele.id}
                                        onChange={(event) => setFormData({...formData,[controllerItem.name]: event.target.value})}/>
                                      <label htmlFor={idx}>{ele.label}</label>               
                             </div> ) : null 
                           }
                        </div>
                        break;
              case types.TEXTAREA: 
                        element = (
                          <textarea name={controllerItem.name} 
                          id={controllerItem.name}
                          placeholder={controllerItem.placeholder}
                          value={value}
                          onChange={(event) => setFormData({...formData, [controllerItem.name]: event.target.value})}/>
                        )
                        break;
              default: 
                  element = (
                    <input type={controllerItem.type}
                    name={controllerItem.name}
                    placeholder={controllerItem.placeholder}
                    id={controllerItem.name}
                    value={value}
                    onChange={(event) => setFormData({...formData,[controllerItem.name] :event.target.value})} />
                  )
                  break;
        }
        return element
  }

  return (
    <form onSubmit={onSubmit}>
         <div style={{display: "flex", flexDirection: "column", justifyContent: "center", gap: "5px", height: "100%", width: "100%", border: "2px solid black"}}>
         {
            formControls.map((controllerItem, index) => <div key={index} style={{display: "flex", flexDirection: "column", justifyContent: "center", gap: "3px"}}>
                          <div style={{textAlign: "center", border: "2px solid black"}}>
                            <label htmlFor={controllerItem.name}>{controllerItem.label}</label>
                          </div>
                          <div style={{textAlign: "center", border: "2px solid black"}}>
                              {
                                getControllerItem(controllerItem)
                              }
                          </div>
            </div> )
          }
          <div style={{textAlign: "center", border: "2px solid black"}}>
                <button type='submit'>{"Submit" || buttonNext}</button>
          </div>
         </div>
    </form>
  )
}

export default Form
