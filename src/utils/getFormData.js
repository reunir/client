export function handleFormSubmit(fn){
    return (e) => {
        e.preventDefault();
        const formData = new FormData(e.target)
        var formJSON = Object.fromEntries(formData.entries());
        return fn(formJSON);
    }
}
export function getFormData(formData){
    var formJSON = Object.fromEntries(formData.entries());
    return formJSON
}