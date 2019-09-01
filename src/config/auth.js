// Define authentication static data

const role = {
    admin: {
        id: 1,
    },
    supplier: {
        id: 2,
    },
    buyer: {
        id: 3,
    },
};

const roleIndex = {
    1:'admin',
    2:'supplier',
    3:'buyer',
}


const roleName = {
    'admin':1,
    'supplier':2,
    'buyer':3,
}


export default {
    role,
    roleIndex,
    roleName,
}
