import { makeApi, Zodios, type ZodiosOptions } from '@zodios/core';
import { z } from 'zod';

const Category = z.object({ id: z.number().int(), name: z.string() }).partial().passthrough();
const Tag = z.object({ id: z.number().int(), name: z.string() }).partial().passthrough();
const Pet = z
  .object({
    id: z.number().int().optional(),
    name: z.string(),
    category: Category.optional(),
    photoUrls: z.array(z.string()),
    tags: z.array(Tag).optional(),
    status: z.enum(['available', 'pending', 'sold']).optional()
  })
  .passthrough();
const ApiResponse = z.object({ code: z.number().int(), type: z.string(), message: z.string() }).partial().passthrough();
const Order = z
  .object({
    id: z.number().int(),
    petId: z.number().int(),
    quantity: z.number().int(),
    shipDate: z.string().datetime({ offset: true }),
    status: z.enum(['placed', 'approved', 'delivered']),
    complete: z.boolean()
  })
  .partial()
  .passthrough();
const User = z
  .object({
    id: z.number().int(),
    username: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    email: z.string(),
    password: z.string(),
    phone: z.string(),
    userStatus: z.number().int()
  })
  .partial()
  .passthrough();

export const schemas = {
  Category,
  Tag,
  Pet,
  ApiResponse,
  Order,
  User
};

const endpoints = makeApi([
  {
    method: 'put',
    path: '/pet',
    alias: 'updatePet',
    description: `Update an existing pet by Id.`,
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        description: `Update an existent pet in the store`,
        type: 'Body',
        schema: Pet
      }
    ],
    response: Pet,
    errors: [
      {
        status: 400,
        description: `Invalid ID supplied`,
        schema: z.void()
      },
      {
        status: 404,
        description: `Pet not found`,
        schema: z.void()
      },
      {
        status: 422,
        description: `Validation exception`,
        schema: z.void()
      }
    ]
  },
  {
    method: 'post',
    path: '/pet',
    alias: 'addPet',
    description: `Add a new pet to the store.`,
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        description: `Create a new pet in the store`,
        type: 'Body',
        schema: Pet
      }
    ],
    response: Pet,
    errors: [
      {
        status: 400,
        description: `Invalid input`,
        schema: z.void()
      },
      {
        status: 422,
        description: `Validation exception`,
        schema: z.void()
      }
    ]
  },
  {
    method: 'get',
    path: '/pet/:petId',
    alias: 'getPetById',
    description: `Returns a single pet.`,
    requestFormat: 'json',
    parameters: [
      {
        name: 'petId',
        type: 'Path',
        schema: z.number().int()
      }
    ],
    response: Pet,
    errors: [
      {
        status: 400,
        description: `Invalid ID supplied`,
        schema: z.void()
      },
      {
        status: 404,
        description: `Pet not found`,
        schema: z.void()
      }
    ]
  },
  {
    method: 'post',
    path: '/pet/:petId',
    alias: 'updatePetWithForm',
    description: `Updates a pet resource based on the form data.`,
    requestFormat: 'json',
    parameters: [
      {
        name: 'petId',
        type: 'Path',
        schema: z.number().int()
      },
      {
        name: 'name',
        type: 'Query',
        schema: z.string().optional()
      },
      {
        name: 'status',
        type: 'Query',
        schema: z.string().optional()
      }
    ],
    response: Pet,
    errors: [
      {
        status: 400,
        description: `Invalid input`,
        schema: z.void()
      }
    ]
  },
  {
    method: 'delete',
    path: '/pet/:petId',
    alias: 'deletePet',
    description: `Delete a pet.`,
    requestFormat: 'json',
    parameters: [
      {
        name: 'api_key',
        type: 'Header',
        schema: z.string().optional()
      },
      {
        name: 'petId',
        type: 'Path',
        schema: z.number().int()
      }
    ],
    response: z.void(),
    errors: [
      {
        status: 400,
        description: `Invalid pet value`,
        schema: z.void()
      }
    ]
  },
  {
    method: 'post',
    path: '/pet/:petId/uploadImage',
    alias: 'uploadFile',
    description: `Upload image of the pet.`,
    requestFormat: 'binary',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: z.instanceof(File)
      },
      {
        name: 'petId',
        type: 'Path',
        schema: z.number().int()
      },
      {
        name: 'additionalMetadata',
        type: 'Query',
        schema: z.string().optional()
      }
    ],
    response: ApiResponse,
    errors: [
      {
        status: 400,
        description: `No file uploaded`,
        schema: z.void()
      },
      {
        status: 404,
        description: `Pet not found`,
        schema: z.void()
      }
    ]
  },
  {
    method: 'get',
    path: '/pet/findByStatus',
    alias: 'findPetsByStatus',
    description: `Multiple status values can be provided with comma separated strings.`,
    requestFormat: 'json',
    parameters: [
      {
        name: 'status',
        type: 'Query',
        schema: z.enum(['available', 'pending', 'sold']).optional().default('available')
      }
    ],
    response: z.array(Pet),
    errors: [
      {
        status: 400,
        description: `Invalid status value`,
        schema: z.void()
      }
    ]
  },
  {
    method: 'get',
    path: '/pet/findByTags',
    alias: 'findPetsByTags',
    description: `Multiple tags can be provided with comma separated strings. Use tag1, tag2, tag3 for testing.`,
    requestFormat: 'json',
    parameters: [
      {
        name: 'tags',
        type: 'Query',
        schema: z.array(z.string()).optional()
      }
    ],
    response: z.array(Pet),
    errors: [
      {
        status: 400,
        description: `Invalid tag value`,
        schema: z.void()
      }
    ]
  },
  {
    method: 'get',
    path: '/store/inventory',
    alias: 'getInventory',
    description: `Returns a map of status codes to quantities.`,
    requestFormat: 'json',
    response: z.record(z.number().int())
  },
  {
    method: 'post',
    path: '/store/order',
    alias: 'placeOrder',
    description: `Place a new order in the store.`,
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: Order
      }
    ],
    response: Order,
    errors: [
      {
        status: 400,
        description: `Invalid input`,
        schema: z.void()
      },
      {
        status: 422,
        description: `Validation exception`,
        schema: z.void()
      }
    ]
  },
  {
    method: 'get',
    path: '/store/order/:orderId',
    alias: 'getOrderById',
    description: `For valid response try integer IDs with value &lt;&#x3D; 5 or &gt; 10. Other values will generate exceptions.`,
    requestFormat: 'json',
    parameters: [
      {
        name: 'orderId',
        type: 'Path',
        schema: z.number().int()
      }
    ],
    response: Order,
    errors: [
      {
        status: 400,
        description: `Invalid ID supplied`,
        schema: z.void()
      },
      {
        status: 404,
        description: `Order not found`,
        schema: z.void()
      }
    ]
  },
  {
    method: 'delete',
    path: '/store/order/:orderId',
    alias: 'deleteOrder',
    description: `For valid response try integer IDs with value &lt; 1000. Anything above 1000 or non-integers will generate API errors.`,
    requestFormat: 'json',
    parameters: [
      {
        name: 'orderId',
        type: 'Path',
        schema: z.number().int()
      }
    ],
    response: z.void(),
    errors: [
      {
        status: 400,
        description: `Invalid ID supplied`,
        schema: z.void()
      },
      {
        status: 404,
        description: `Order not found`,
        schema: z.void()
      }
    ]
  },
  {
    method: 'post',
    path: '/user',
    alias: 'createUser',
    description: `This can only be done by the logged in user.`,
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        description: `Created user object`,
        type: 'Body',
        schema: User
      }
    ],
    response: User
  },
  {
    method: 'get',
    path: '/user/:username',
    alias: 'getUserByName',
    description: `Get user detail based on username.`,
    requestFormat: 'json',
    parameters: [
      {
        name: 'username',
        type: 'Path',
        schema: z.string()
      }
    ],
    response: User,
    errors: [
      {
        status: 400,
        description: `Invalid username supplied`,
        schema: z.void()
      },
      {
        status: 404,
        description: `User not found`,
        schema: z.void()
      }
    ]
  },
  {
    method: 'put',
    path: '/user/:username',
    alias: 'updateUser',
    description: `This can only be done by the logged in user.`,
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        description: `Update an existent user in the store`,
        type: 'Body',
        schema: User
      },
      {
        name: 'username',
        type: 'Path',
        schema: z.string()
      }
    ],
    response: z.void(),
    errors: [
      {
        status: 400,
        description: `bad request`,
        schema: z.void()
      },
      {
        status: 404,
        description: `user not found`,
        schema: z.void()
      }
    ]
  },
  {
    method: 'delete',
    path: '/user/:username',
    alias: 'deleteUser',
    description: `This can only be done by the logged in user.`,
    requestFormat: 'json',
    parameters: [
      {
        name: 'username',
        type: 'Path',
        schema: z.string()
      }
    ],
    response: z.void(),
    errors: [
      {
        status: 400,
        description: `Invalid username supplied`,
        schema: z.void()
      },
      {
        status: 404,
        description: `User not found`,
        schema: z.void()
      }
    ]
  },
  {
    method: 'post',
    path: '/user/createWithList',
    alias: 'createUsersWithListInput',
    description: `Creates list of users with given input array.`,
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: z.array(User)
      }
    ],
    response: User
  },
  {
    method: 'get',
    path: '/user/login',
    alias: 'loginUser',
    description: `Log into the system.`,
    requestFormat: 'json',
    parameters: [
      {
        name: 'username',
        type: 'Query',
        schema: z.string().optional()
      },
      {
        name: 'password',
        type: 'Query',
        schema: z.string().optional()
      }
    ],
    response: z.string(),
    errors: [
      {
        status: 400,
        description: `Invalid username/password supplied`,
        schema: z.void()
      }
    ]
  },
  {
    method: 'get',
    path: '/user/logout',
    alias: 'logoutUser',
    description: `Log user out of the system.`,
    requestFormat: 'json',
    response: z.void()
  }
]);

export const api = new Zodios(endpoints);

export function createApiClient(baseUrl: string, options?: ZodiosOptions) {
  return new Zodios(baseUrl, endpoints, options);
}
