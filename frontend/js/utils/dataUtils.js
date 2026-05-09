export function formatDate(date){
    const formatDate = new Date(date);

    return formatDate.toLocaleDateString("es-ES",{
        year: "2-digit",
        month: "2-digit",
        day: "numeric",
    }); 
}