type User = {
    id: number;
    name: string;
    email: string;
    password: string;
    role: string;
    status: string;
    username: string;
}


export const userData: User[] = [
    {
        id: 1,
        name: "John Doe",
        email: "uno@prueba.com",
        password: "password",
        role: "Admin",
        status: "active",  
        username: "johndoe",
    },
    {
        id: 2,
        name: "Jane Smith",
        email: "dos@prueba.com", 
        password: "password",
        role: "User",
        status: "inactive",      
        username: "janesmith",  

    }]